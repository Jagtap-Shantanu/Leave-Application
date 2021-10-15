const userServices = require("./user.services")
const mailer = require("../services/mailer")
const emailValidator = require("email-validator")

const register = (req, res) => {
 
    var regExp = /\+?\d[\d -]{8,12}\d/
    var phoneValidation = regExp.test(req.body.phone)

    if (! emailValidator.validate(req.body.email)) {
        return res.status(400).send({status: "Error", message: "Invalid email address"})
    } else if (! phoneValidation) {
        return res.status(400).send({status: "Error", message: "Invalid phone number"})
    }

    userServices.isEmail(req.body.email).then(() => {
        userServices.addUser(req.body).then((data) => {
            const token = userServices.createToken(req.body)
            console.log(req.body, token)
            var url = "http://localhost:3000/user/verify?token="+token
            var emailDetails = mailer.setBody(req.body.email, url)
    
            //console.log("Email details ", emailDetails)
            mailer.sendMail(emailDetails).then(() => {
                //console.log("Inside sendMail then")
                res.set("verificationToken", token)
                res.send({status: "Success", data, message: "Verification mail sent"})
            }).catch((err) => {
                //console.log("Inside sendMail catch")
                res.status(500).send({status: "Error", message: "Error during sending email"})
            })
    
        }).catch((err) => {
            if(err.code == 11000) {
                return res.status(409).send({status: "Error", message: "Email already registered"})
            }
            console.log(err)
            res.status(500).send({status: "Error", message: "Unable to add user into db"})
        })
    }).catch(() => {
        console.log("==================================")
        res.status(400).send({status: "Error", message: "Email does not exist "})
    })
}

const verify = (req, res) => {
    var token = req.query.token
    console.log("verification token ", token)
    userServices.verifyToken(token).then((result) => {
        userServices.verifyUser(result.data ,token, (err, result) => {
            if (err) {
                //console.log("Error in verifying the user")
                res.status(401).send({status: "Error", message:"User verified"})
            } else {
                console.log("User verified", result)
                res.send({status: "Success", message:"User verified"}) 
            }
        }) 
    }).catch(() => {
        res.status(500).send({status: "Error", message:"User not verified"})
    })
}


module.exports = {
    register,
    verify
}
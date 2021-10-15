const userServices = require("./user.services")
const mailer = require("../services/mailer")
const emailValidator = require("email-validator")
const UserModel = require("./user.model")

const register = (req, res) => {
 
    var regExp = /\+?\d[\d -]{8,12}\d/
    var phoneValidation = regExp.test(req.body.phone)

    if (! emailValidator.validate(req.body.email)) {
        return res.send({status: "Error", message: "Invalid email address"})
    } else if (! phoneValidation) {
        return res.send({status: "Error", message: "Invalid phone number"})
    }

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
        }).catch(() => {
            //console.log("Inside sendMail catch")
            res.send("Internal server error")
        })

    }).catch((err) => {
        if(err.code == 11000) {
            return res.status(409).send({status: "Error", message: "Email already registered"})
        }
        console.log(err)
        res.status(500).send("Internal server error", err)
    })
}

const verify = (req, res) => {
    var token = req.query.token
    console.log("verification token ", token)
    userServices.verifyToken(token).then((result) => {
        userServices.verifyUser(result.data ,token, (err, result) => {
            if (err) {
                //console.log("Error in verifying the user")
                res.send("Unable to verify user")
            } else {
                console.log("User verified", result)
                res.send({
                    message:"User verified"
                })  
            }
        }) 
    }).catch(() => {
        res.send({
            message:"User not verified"
        })
    })
}


module.exports = {
    register,
    verify
}
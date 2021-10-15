const UserModel = require("./user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const addUser = (data) => {

    data.userID = (new Date().getTime()).toString(15)
    //console.log("With userID---------->", data)
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(data.password, salt);

    console.log("Hashed password---------> ", hash)

    data.password = hash

    return new Promise((resolve, reject) => {
        const user = new UserModel(data)
        
        user.save().then((data) => {
            console.log("User data saved on db", data)
            resolve(data)
        }).catch((err) => {
            console.log("Internal server error ", err)
            reject(err)
        })
    })
}

const createToken = (data) => {
    var token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: data
      }, 'secret');

    return token
} 

const verifyUser = (data, token, callback) => {
    console.log("Data in verify function ", data)
    var findQuery = {
        email: data.email
    }

    var updateQuery = {
        $set: {
            verified: true
        }
    }

    jwt.verify(token, 'secret', (err, res) => {

        if(err) {
            //console.log("Inside err in verify function ", err)
            callback(err, null)
        } else {
            //console.log("Verified user" ,res)

            UserModel.findOneAndUpdate(findQuery, updateQuery, (error) => {
                if (error) {
                    //console.log("Error in updatig verified status")
                } else {
                    console.log("Verified status updated")
                    callback(null, res)
                }
            })
        }
    })
}

const verifyToken = (data) => {
    return new Promise((resolve, reject) => {
        jwt.verify(data, 'secret', (err, result) => {
            if (err) {
                reject(err)
            } else {
                console.log("Token payload verified data ", result)
                resolve(result)
            }
        })
    })   
}

module.exports = {
    addUser,
    createToken,
    verifyToken,
    verifyUser
}
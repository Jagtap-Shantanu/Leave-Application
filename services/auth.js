const jwt = require("jsonwebtoken")

const isAuthorised = (req, res, next) => {
    const loginToken = req.headers["logintoken"]
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<", loginToken)
    verifyToken(loginToken).then((payload) => {
        console.log("^^^^^^^^^^^^^^^^^^^^^^", payload)
        if(payload.data.verified) {
            if(payload.data.role === "admin") {
                next()
            } else {
                res.status(401).send({status: "Error", message: "You are not admin so you cannot access the data of all users"})
            }
        } else {
            res.status(401).send({status: "Error", message: "You account is not verified yet."})
        }
    }).catch((err) => {
        res.send({status: "Error", message: err.message})
    })
}

const isUser  = (req, res, next) => {
    const loginToken = req.headers["logintoken"]
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<", loginToken)
    verifyToken(loginToken).then((payload) => {
        console.log("^^^^^^^^^^^^^^^^^^^^^^", payload)
        req.email = payload.data.email
        if(payload.data.verified) {
            if(payload.data.role === "user") {
                next()
            } else {
                res.status(401).send({status: "Error", message: "You are not user so you cannot report leave"})
            }
        } else {
            res.status(401).send({status: "Error", message: "You account is not verified yet."})
        }
    }).catch((err) => {
        res.send({status: "Error", message: err.message})
    })
}

const verifyToken = (data) => {
    //console.log("Token is ---------->       ", data)
    return new Promise((resolve, reject) => {
        jwt.verify(data, 'secret', (err, result) => {
            if (err) {
                console.log("error is ", err)
                reject(err)
            } else {
                console.log("result is ", result)
                console.log("Toke payload verified data ", result)
                resolve(result)
            }
        })
    })   
}

module.exports = {
    isAuthorised,
    verifyToken,
    isUser
}

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
                res.status(401).send({status: "Error", message: "Admin cannot perform this action"})
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

const validateDates = (req, res, next) => {
    console.log(req.body)

    if (!req.body.startDate || !req.body.endDate) {
        return res.status(400).send({status: "Error", message: "startDate and endDate is required"})
    }

    var startDate = req.body.startDate.split("-")[2]
    var endDate = req.body.endDate.split("-")[2]

    var startMonth = req.body.startDate.split("-")[1]
    var endMonth = req.body.endDate.split("-")[1]

    var startYear = req.body.startDate.split("-")[0]
    var endYear = req.body.endDate.split("-")[0]
    //console.log(startDate, endDate)
    var dayCount 

    if (parseInt(startYear) != parseInt(endYear)) {
        return res.status(400).send({status: "Error", message: "startYear and endYear should be same"})
    }

    if (parseInt(startMonth) == parseInt(endMonth)) {
        if (parseInt(startDate) < new Date().getDate() + 1)  {
            return res.status(400).send({status: "Error", message: "startDate should be 1 + today's date. Because it takes one day for approving your application"})
        }       
        if (parseInt(startDate) > parseInt(endDate)) {
            console.log(1)
            return res.status(400).send({status: "Error", message: "endDate should be greater then startDate"})
        } else if (parseInt(startDate) == parseInt(endDate)) {
            console.log(2)
            dayCount = 1
            console.log("DayCount", dayCount)
            req.dayCount = dayCount
            next()
        } else {
            console.log(3)
            dayCount = (parseInt(endDate) - parseInt(startDate)) + 1
            console.log("DayCount", dayCount)
            req.dayCount = dayCount
            next()
        }
    } else if (parseInt(startMonth) > parseInt(endMonth)) {
        console.log(4)
        return res.status(400).send({status: "Error", message: "endDate should be greater then startDate"})
    } else {
        console.log(5)
        return res.status(400).send({status: "Error", message: "startDate and endDate should be from single month"})
    }

}

const isAdmin  = (req, res, next) => {
    const loginToken = req.headers["logintoken"]
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<", loginToken)
    verifyToken(loginToken).then((payload) => {
        console.log("^^^^^^^^^^^^^^^^^^^^^^", payload)
        if(payload.data.verified) {
            if(payload.data.role === "admin") {
                next()
            } else {
                res.status(401).send({status: "Error", message: "User cannot perform this action"})
            }
        } else {
            res.status(401).send({status: "Error", message: "You account is not verified yet."})
        }
    }).catch((err) => {
        res.send({status: "Error", message: err.message})
    })
}

module.exports = {
    isAuthorised,
    verifyToken,
    isUser,
    validateDates,
    isAdmin
}

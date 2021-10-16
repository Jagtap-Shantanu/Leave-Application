const leaveServices = require("./leave.services")

const reportLeave = (req, res) => {
    console.log("++++++++++++++++++++++++++++++++++++++++++", req.body)

    var startDate = req.body.startDate.split("-")[2]
    var endDate = req.body.endDate.split("-")[2]

    var startMonth = req.body.startDate.split("-")[1]
    var endMonth = req.body.endDate.split("-")[1]

    var startYear = req.body.startDate.split("-")[0]
    var endYear = req.body.endDate.split("-")[0]
    //console.log(startDate, endDate)
    var dayCount 

    if (parseInt(startYear) != parseInt(endYear)) {
        return res.status(401).send({status: "Error", message: "startYear and endYear should be same"})
    }

    if (parseInt(startMonth) == parseInt(endMonth)) {
        if (parseInt(startDate) > parseInt(endDate)) {
            console.log(1)
            return res.status(401).send({status: "Error", message: "endDate should be greater then startDate"})
        } else if (parseInt(startDate) == parseInt(endDate)) {
            console.log(2)
            dayCount = 1
            console.log("DayCount", dayCount)
        } else {
            console.log(3)
            dayCount = (parseInt(endDate) - parseInt(startDate)) + 1
            console.log("DayCount", dayCount)
        }
    } else if (parseInt(startMonth) > parseInt(endMonth)) {
        console.log(4)
        return res.status(401).send({status: "Error", message: "endDate should be greater then startDate"})
    } else {
        console.log(5)
        return res.status(401).send({status: "Error", message: "startDate and endDate should be from single month"})
    }

    req.body.dayCount = dayCount

    leaveServices.addLeave(req.body, req.email).then((data) => {
        res.send({status: "Success", data})
    }).catch((err) => {
        res.status(500).send({status: "Error", message: err.message})
    })
}

module.exports = {
    reportLeave
}
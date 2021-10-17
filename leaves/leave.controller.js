const leaveServices = require("./leave.services")

const reportLeave = (req, res) => {
    console.log("++++++++++++++++++++++++++++++++++++++++++", req.body)
    console.log("++++++++++++++++++++++++++++++++++++++++++", req.dayCount)

    req.body.dayCount = req.dayCount

    leaveServices.addLeave(req.body, req.email).then((data) => {
        res.send({status: "Success", data})
    }).catch((err) => {
        res.status(500).send({status: "Error", message: err.message})
    })
}

const getAllReports = (req, res) => {
    console.log("UserId in query", req.query.userID)
    leaveServices.getLeaves(req.query.userID).then((data) => {
        res.send({status: "Success", data})
    }).catch((err) => {
        res.status(500).send({status: "Error", message: err.message})
    })
}

const deleteReport = (req, res) => {
    leaveServices.deleteLeave(req.query.leaveID).then((data) => {
        if (data === null) {
            return res.status(404).send({status: "Error", message: "You cannot delete approved reports"})
        }
        res.send({status: "Success", data})
    }).catch((err) => {
        res.status(500).send({status: "Error", message: err.message})
    })
}

const updateReport = (req, res) => {
    req.body.dayCount = req.dayCount
 
    if (req.body.status) {
        return res.status(401).send({status: "Error", message: "Only admin can update status of report"})
    } 

    leaveServices.updateLeave(req.query.leaveID, req.body).then((data) => {
        if (data === null) {
            return res.status(400).send({status: "Error", message: "You cannot update approved report"})
        }
        res.send({status: "Success", data})
    }).catch((err) => {
        res.status(500).send({status: "Error", message: err.message})
    })
}

module.exports = {
    reportLeave,
    getAllReports,
    deleteReport,
    updateReport
}
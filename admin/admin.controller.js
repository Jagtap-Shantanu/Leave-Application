const adminServices = require("./admin.services")

const getAllReports = (req, res) => {

    adminServices.getLeaves().then((data) => {
        res.send({status: "Success", data})
    }).catch((err) => {
        res.status(500).send({status: "Error", message: err.message})
    })
}

const getAllUsers = (req, res) => {

    adminServices.getUsers().then((data) => {
        res.send({status: "Success", data})
    }).catch((err) => {
        res.status(500).send({status: "Error", message: err.message})
    })
}

const approveReport = (req, res) => {
    console.log("%%%%%%%%%%%%%%%%%%%%%%%", req.query.leaveID)

    adminServices.approve(req.query.leaveID).then((data) => {
        res.send({status: "Success", data})
    }).catch((err) => {
        res.status(500).send({status: "Error", message: err})
    })
}

module.exports = {
    getAllReports,
    getAllUsers,
    approveReport
}
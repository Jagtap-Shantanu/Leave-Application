const adminServices = require("./admin.services")
const path = require("path")

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

const rejectReport = (req, res) => {
    console.log("%%%%%%%%%%%%%%%%%%%%%%%", req.query.leaveID)

    adminServices.reject(req.query.leaveID, req.body.reason).then((data) => {
        res.send({status: "Success", data})
    }).catch((err) => {
        res.status(500).send({status: "Error", message: err})
    })
}

const suggestReport = (req, res) => {
    //console.log("Suggestion is", req.body)
    if (!req.body.suggestion) {
        return res.status(400).send({status: "Error", message: "suggestion required"})
    }
    adminServices.suggest(req.query.leaveID, req.body).then((data) => {
        res.send({status: "Success", message: "Suggestion mailed to the user"})
    }).catch((err) => {
        res.status(500).send({status: "Error", message: err.message})
    })
}

const getReports = (req, res) => {
    adminServices.fetchLeaves(req.query.status).then((data) => {
        res.send({status: "Success", data})
    }).catch((err) => {
        res.status(500).send({status: "Error", message: err.message})
    })
}

const getUserReportsByID = (req, res) => {
    adminServices.getLeavesByID(req.query.userID).then((userLeaves) => {
        res.send({status: "Success", userLeaves})
    }).catch((err) => {
        res.status(500).send({status: "Error", message: err.message})
    })
}
 
const download = (req, res) => {
    adminServices.storeJsonToExcel().then((result) => {
        var excelFilePath = path.resolve(__dirname, "../UserLeaveData.xlsx")
        console.log("Path is", excelFilePath)
        //res.download(excelFilePath)
        res.send({status: "Success", message: result})
    }).catch((err) => {
        res.status(500).send({status: "Error", message: err})
    })
}

module.exports = {
    getAllReports,
    getAllUsers,
    approveReport,
    rejectReport,
    suggestReport,
    getReports,
    getUserReportsByID,
    download
}
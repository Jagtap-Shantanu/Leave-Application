const LeaveModel = require("../leaves/leave.model")
const UserModel = require("../users/user.model")

const getLeaves = () => {
    return new Promise((resolve, reject) => {
        LeaveModel.find().then((data) => {
            console.log("leave data", data)
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}

const getUsers = () => {
    return new Promise((resolve, reject) => {
        UserModel.find().then((data) => {
            console.log("User data", data)
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}

const approve = (leaveID) => {
    return new Promise((resolve, reject) => {
        console.log("Inside Promise", leaveID)
   
        LeaveModel.findOneAndUpdate({leaveID}, {status: "approved"}).then((approvedReport) => {
        console.log("Inside findOneAndUpdate of LeaveModel", approvedReport)
            UserModel.updateOne({userID: approvedReport.userID}, {$inc: { leaveCount: 1 }}).then((userDetails) => {
                console.log("Inside findOneAndUpdate of UserModel")
                resolve({approvedReport, userDetails})
            }).catch((err) => {
                console.log("Inside error 1")
                reject(err)
            })
        }).catch((err) => {
            console.log("Inside error 2")
            reject(err)
        })
        
    })
}

module.exports = {
    getLeaves,
    getUsers,
    approve
}
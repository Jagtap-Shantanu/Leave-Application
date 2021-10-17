const LeaveModel = require("./leave.model")
const UserModel = require("../users/user.model")
const mailer = require("../services/mailer")

const addLeave = (data, email) => {
    data.leaveID = (new Date().getTime()).toString(15)
    console.log("Inside addLeave function")
    console.log(data)

    return new Promise((resolve, reject) => {
        UserModel.findOne({email}, {userID: 1}).then((userData) => {
            //console.log("User idddddddddddddddddddddddddddd", userData)
            data.userID = userData.userID
            //console.log("User idddddddddddddddddddddddddddd", data)
            const leave = new LeaveModel(data)
            console.log("Leave ", leave)
            leave.save().then((data) => {
                console.log("User data saved on db", data)

                var reportBody = mailer.setReportBody(email, data.leaveID)
                console.log("Report body", reportBody)

                mailer.sendMail(reportBody).then(() => {
                    console.log("----------------------------------------------------------")
                    var adminBody = mailer.setAdminBody("shantanujagtap93@gmail.com", data.leaveID, userData.userID)
                    console.log("Admin body", adminBody)

                    mailer.sendMail(adminBody).then(() => {
                        resolve(data)
                    }).catch((err) => {
                        reject(err)
                    })

                }).catch((err) => {
                    reject(err)
                })

            }).catch((err) => {
                console.log("Internal server error ", err)
                reject(err)
            })
        }).catch((err) => {
            console.log(err)
            reject(err)
        })
    })
}

const getLeaves = (userID) => {
    return new Promise((resolve, reject) => {
        LeaveModel.find({userID}).then((data) => {
            console.log("leave data", data)
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}

const deleteLeave = (leaveID) => {
    return new Promise((resolve, reject) => {

        LeaveModel.findOneAndDelete({leaveID, status: "pending"}).then((pendingData) => {
            console.log("Pending data", pendingData)
            if (pendingData === null) {
                LeaveModel.findOneAndDelete({leaveID, status: "suggestion"}).then((suggestionData) => {
                    console.log("suggestionData data", suggestionData)
                    resolve(suggestionData)
                }).catch((err) => {
                    reject(err)
                })
            } else {
                resolve(pendingData)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

const updateLeave = (leaveID, data) => {
    return new Promise((resolve, reject) => {
        data.status = "pending"
        LeaveModel.findOneAndUpdate({leaveID}, data).then((updateData) => {
            resolve(updateData)
        }).catch((err) => {
            reject(err) 
        })
    })
}

module.exports = {
    addLeave,
    getLeaves,
    deleteLeave,
    updateLeave
}
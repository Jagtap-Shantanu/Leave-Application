const LeaveModel = require("../leaves/leave.model")
const UserModel = require("../users/user.model")
const mailer = require("../services/mailer")

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
        //console.log("Inside Promise", leaveID)
        
        LeaveModel.findOneAndUpdate({leaveID}, {status: "approved"}).then((approvedReport) => {
            console.log("Inside findOneAndUpdate of LeaveModel", approvedReport)
            UserModel.updateOne({userID: approvedReport.userID}, {$inc: { leaveCount: 1 }}).then(() => {
                //console.log("Inside findOneAndUpdate of UserModel")

                UserModel.findOne({userID: approvedReport.userID}, {email: 1}).then((data) => {
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! kya yaar", data.email, leaveID)

                    var approveBody = mailer.setApproveBody(data.email, leaveID)

                    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", approveBody)

                    mailer.sendMail(approveBody).then(() => {
                        resolve(approvedReport)
                    }).catch((err) => {
                        reject(err)
                    })

                }).catch((err) => {
                    reject(err)
                })

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
 
const reject = (leaveID) => {
    return new Promise((resolve, reject) => {
        LeaveModel.findOneAndUpdate({leaveID}, {status: "rejected"}).then((rejectData) => {

            UserModel.findOne({userID: rejectData.userID}, {email: 1}).then((data) => {
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! kya yaar", data.email, leaveID)

                var rejectBody = mailer.setRejectBody(data.email, leaveID)

                console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", rejectBody)

                mailer.sendMail(rejectBody).then(() => {
                    resolve(rejectData)
                }).catch((err) => {
                    reject(err)
                })

            }).catch((err) => {
                reject(err)
            })
    
        }).catch((err) => {
            reject(err)
        })
    })
}

const suggest = (leaveID, body) => {
    return new Promise((resolve, reject) => {
        LeaveModel.findOneAndUpdate({leaveID}, {status: "suggestion"}, {userID: 1}).then((leaveData) => {
            UserModel.findOne({userID: leaveData.userID}, {email: 1}).then((userData) => {
                var mailDetails = mailer.setSuggestionBody(userData.email, body, leaveID)
                console.log("mail details", mailDetails)

                mailer.sendMail(mailDetails).then((data) => {
                    resolve(data)
                }).catch((err) => {
                    reject(err)
                })

            }).catch((err) => {
                reject(err)
            })
        }).catch((err) => {
            reject(err)
        })
    })
}

module.exports = {
    getLeaves,
    getUsers,
    approve,
    reject,
    suggest
}
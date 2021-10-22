const LeaveModel = require("../leaves/leave.model")
const UserModel = require("../users/user.model")
const mailer = require("../services/mailer")
const XLSX = require("xlsx")
const fs = require("fs")

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
        
        LeaveModel.findOneAndUpdate({leaveID}, {status: "approved"}, {new: true}).then((approvedReport) => {
            console.log("Inside findOneAndUpdate of LeaveModel", approvedReport)
            UserModel.updateOne({userID: approvedReport.userID}, {$inc: { leaveCount: 1 }}).then(() => {
                //console.log("Inside findOneAndUpdate of UserModel dayCOunt", approvedReport)

                UserModel.findOneAndUpdate({userID: approvedReport.userID}, {$inc: {remainingLeaves: -approvedReport.dayCount}}, {new: true}).then((data) => {
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! kya yaar", data)

                    var approveBody = mailer.setApproveBody(data.email, leaveID, data.remainingLeaves)

                    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", data)

                    mailer.sendMail(approveBody).then(() => {
                        resolve(approvedReport)
                    }).catch((err) => {
                        reject(err)
                    })

                    //UserModel.findOneAndUpdate({userID: approvedReport.userID}, {$inc: {penalty: }})

                }).catch((err) => {
                    reject(err)
                })

            }).catch((err) => {
                console.log("Inside error 1", err)
                reject(err)
            })
        }).catch((err) => {
            console.log("Inside error 2")
            reject(err)
        })
        
    })
}
 
const reject = (leaveID, reason) => {
    return new Promise((resolve, reject) => {
        LeaveModel.findOneAndUpdate({leaveID}, {status: "rejected"}, {new: true}).then((rejectData) => {

            UserModel.findOne({userID: rejectData.userID}, {email: 1}).then((data) => {
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! kya yaar", data.email, leaveID)

                var rejectBody = mailer.setRejectBody(data.email, leaveID, reason)

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
        LeaveModel.findOneAndUpdate({leaveID}, {status: "suggestion"}, {new: true}).then((leaveData) => {
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

const fetchLeaves = (status) => {
    return new Promise((resolve, reject) => {
        LeaveModel.find({status}).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}

const getLeavesByID = (userID) => {
    return new Promise((resolve, reject) => {
        LeaveModel.find({userID}).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err) 
        })
    })
}

const storeLeaves = () => {

    if (!fs.existsSync("users.txt")) {
        fs.appendFileSync("users.txt", "")
    }

    return new Promise(function(resolve,reject) {
        LeaveModel.find({}, {leaveID: 1, userID: 1, title: 1, startDate: 1, endDate: 1, dayCount: 1, status: 1}).sort({userID: 1}).then((data) => {
            console.log("leave data", data)
            var string = JSON.stringify(data)+"\n"
            fs.writeFile("users.txt", string, function(error){
                if(error){
                    reject(err)
                }
                else{
                    resolve(string)
                }
            })
        }).catch((err) => {
            reject(err)
        })
    })
}

const dataToExcel = () => {
  
    return new Promise ((resolve, reject) => {

        fs.readFile("./users.txt", (err, data) => {

            if(err) {
                console.log("Inside if")
                reject(err)
            } else {
                console.log("Inside else")
                var userData = data.toString().trim().split("\n")
                //console.log(userData)
                var userobj = []
                userData.forEach((each) => {
                    userobj.push(JSON.parse(each))
                })
                console.log(userobj[0])
                let binaryWS = XLSX.utils.json_to_sheet(userobj[0]); 
                
                // Create a new Workbook
                var wb = XLSX.utils.book_new() 
            
                // Name your sheet
                XLSX.utils.book_append_sheet(wb, binaryWS, 'Users') 
                
                // export your excel
                XLSX.writeFile(wb, 'UserLeaveData.xlsx');
                console.log("Data added into excel!")
                resolve()
                }
            })
    })
}

const storeJsonToExcel = async () => {
    try {
        await storeLeaves()
        await dataToExcel()
        return "Done"
    } catch(err) {
        return err
    }
}

const setPenalty = (leaveID) => {
    return new Promise((resolve, reject) => {
        LeaveModel.findOne({leaveID}, {userID: 1, dayCount: 1}).then((leaveData) => {
            console.log("penalty data", leaveData)
            UserModel.findOne({userID: leaveData.userID}, {remainingLeaves: 1}).then((userData) => {
                console.log("remaining leaves are", userData)

                UserModel.findOneAndUpdate({userID: leaveData.userID}, {$set: {penalty: -1 * userData.remainingLeaves * 1000}}, {new: true}).then((penaltyData) => {
                    console.log("Penalty is set to", penaltyData)
                    resolve(penaltyData)
                }).catch((err) => {
                    console.log("remaining leaves", err)
                reject(err)
                })
            }).catch((err) => {
                console.log("remaining leaves", err)
                reject(err)
            })
        })
    })
}

module.exports = {
    getLeaves,
    getUsers,
    approve,
    reject,
    suggest,
    fetchLeaves,
    getLeavesByID,
    storeJsonToExcel,
    setPenalty
}
const cron = require("node-cron")
const LeaveModel = require("../leaves/leave.model")
const UserModel = require("../users/user.model")

const sendNotificationToAdmin = () => {
    return new Promise((resolve, reject) => {
        LeaveModel.find({status: "pending"}, {userID: 1}).then((leaveData) => {
            console.log("leaveData", leaveData)
            var arrayOfEmails = []
            for(var i = 0; i< leaveData.length; i++) {
                UserModel.find({userID: leaveData[i].userID}, {email: 1}).then((userData) => {
                    //console.log(userData)
                    for (var j = 0; j< userData.length; j++) {
                        if (!arrayOfEmails.includes(userData[j].email)) {
                            arrayOfEmails.push(userData[j].email)
                        }
                    }
                    console.log("All emails", arrayOfEmails)
                    //resolve(userData)
                }).catch((err) => {
                    reject(err)
                })
            }

        }).catch((err) => {
            reject(err)
        })
    })
}

sendNotificationToAdmin().then((data) => {
    console.log("sendNotificationToAdmin ", data)
}).catch((err) => {
    console.log("sendNotificationToAdmin error", err.message)
})
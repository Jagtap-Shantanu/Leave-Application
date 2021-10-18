const LeaveModel = require("../leaves/leave.model")
const mailer = require("./mailer")

const sendNotificationToAdmin = () => {
    
    LeaveModel.find({status: "pending"}, {userID: 1}).then((leaveData) => {
        //console.log("leaveData", leaveData)
        var arrayOfUserIDs = []

        for(var i = 0; i< leaveData.length; i++) {
            if(!arrayOfUserIDs.includes(leaveData[i].userID)) {
                arrayOfUserIDs.push(leaveData[i].userID)
            }
        }
        //console.log("sendNotificationToAdmin ", data)
        console.log("sendNotificationToAdmin userIDs", arrayOfUserIDs)
    
        for (var j = 0; j< arrayOfUserIDs.length; j++) {
            var mailBody = mailer.setNotificationBody(arrayOfUserIDs[j])
            mailer.sendMail(mailBody).then(() => {
                console.log("Notification mail sent to admin of user")
            }).catch((err) => {
                console.log("Error while sending notification mail to Admin", err.message)
            })
        }

    }).catch((err) => {
        reject(err)
    })
    
}

module.exports = {
    sendNotificationToAdmin
}

// sendNotificationToAdmin().then((data) => {
//     for(var i = 0; i< data.length; i++) {
//         if(!arrayOfUserIDs.includes(data[i].userID)) {
//             arrayOfUserIDs.push(data[i].userID)
//         }
//     }
//     //console.log("sendNotificationToAdmin ", data)
//     console.log("sendNotificationToAdmin userIDs", arrayOfUserIDs)

//     for (var j = 0; j< arrayOfUserIDs.length; j++) {
//         var mailBody = mailer.setNotificationBody(arrayOfUserIDs[j])
//         mailer.sendMail(mailBody).then(() => {
//             console.log("Notification mail sent to admin of user")
//         }).catch((err) => {
//             console.log("Error while sending notification mail to Admin", err.message)
//         })
//     }

// }).catch((err) => {
//     console.log("sendNotificationToAdmin error", err)
// })



const LeaveModel = require("./leave.model")
const UserModel = require("../users/user.model")

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
                resolve(data)
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

module.exports = {
    addLeave
}
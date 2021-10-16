const LeaveModel = require("./leave.model")

const addLeave = (data) => {
    return new Promise((resolve, reject) => {
        const leave = new LeaveModel(data)
        
        user.save().then((data) => {
            console.log("User data saved on db", data)
            resolve(data)
        }).catch((err) => {
            console.log("Internal server error ", err)
            reject(err)
        })
    })
}

module.exports = {
    addLeave
}
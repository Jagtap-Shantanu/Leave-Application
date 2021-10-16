const leaveServices = require("./leave.services")

const reportLeave = (req, res) => {
    leaveServices.addLeave(req.body)
}

module.exports = {
    reportLeave
}
const Mongoose = require("mongoose")
const Schema = Mongoose.Schema 

const leaveSchema = new Schema ({
    leaveID: {type: String, unique: true},
    userID: {type: String},
    title: {type: String, required: true},
    description: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    dayCount: {type: Number},
    documentUrl: {type: String},
    status: {type: String, default: "pending", enum: ["pending", "approved", "rejected", "suggestion"]},
    dayCount: {type: Number}
})

const leaveModel = Mongoose.model('leaves', leaveSchema)

module.exports = leaveModel
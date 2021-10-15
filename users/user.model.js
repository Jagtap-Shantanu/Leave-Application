const Mongoose = require("mongoose")
const Schema = Mongoose.Schema

const userSchema = new Schema ({
    userID: {type: String, unique: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: "user"},
    phone: {type: Number},
    verified: {type: Boolean, default: false},
    penalty: {type: Number, default: 0},
    leaveCount: {type: Number, defaulf: 0},
    registrationDate: {type: Date, default: new Date()}
})

const userModel = Mongoose.model("users",userSchema)

module.exports = userModel
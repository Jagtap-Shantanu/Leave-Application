const express = require("express")
const router = express.Router()
const leaveController = require("./leave.controller")
const services = require("../services/auth")

router.get("/report", services.isUser, leaveController.reportLeave)

module.exports = router
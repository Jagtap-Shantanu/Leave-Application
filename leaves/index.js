const express = require("express")
const router = express.Router()
const leaveController = require("./leave.controller")
const services = require("../services/auth")

router.post("/report", services.isUser, services.validateDates, leaveController.reportLeave)

router.get("/myreports", services.isUser, leaveController.getAllReports)

router.delete("/delete", services.isUser, leaveController.deleteReport)

router.patch("/update", services.isUser, services.validateDates, leaveController.updateReport)

module.exports = router
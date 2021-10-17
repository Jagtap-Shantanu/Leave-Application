const express = require("express")
const router = express.Router()
const adminController = require("./admin.controller")
const services = require("../services/auth")

router.get("/allreports", services.isAdmin, adminController.getAllReports)

router.get("/allusers", services.isAdmin, adminController.getAllUsers)

router.get("/approve", services.isAdmin, adminController.approveReport)

module.exports = router
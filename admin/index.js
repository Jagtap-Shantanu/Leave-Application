const express = require("express")
const router = express.Router()
const adminController = require("./admin.controller")
const services = require("../services/auth")

router.get("/allreports", services.isAdmin, adminController.getAllReports)

router.get("/allusers", services.isAdmin, adminController.getAllUsers)

router.get("/approve", services.isAdmin, services.isApproved, adminController.approveReport)

router.get("/reject", services.isAdmin, services.isApproved, services.isRejected, adminController.rejectReport)

router.post("/suggest", services.isAdmin, services.isPending, adminController.suggestReport)

module.exports = router
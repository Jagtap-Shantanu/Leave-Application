const express = require("express")
const router = express.Router()
const adminController = require("./admin.controller")
const services = require("../services/auth")

router.get("/allreports", services.isAdmin, adminController.getAllReports)

router.get("/allusers", services.isAdmin, adminController.getAllUsers)

router.get("/approve", services.isAdmin, services.isPending, adminController.approveReport)

router.get("/reject", services.isAdmin, services.isPending, adminController.rejectReport)

router.post("/suggest", services.isAdmin, services.isPending, adminController.suggestReport)

//router.get("/getleaves", services.isAdmin, adminController.getReports)

module.exports = router
const express = require("express")
const router = express.Router()
const userRoute = require("../users")
const leaveRoute = require("../leaves")
const adminRoute = require("../admin")

router.use("/user", userRoute)

router.use("/leave", leaveRoute)

router.use("/admin", adminRoute)

module.exports = router
const express = require("express")
const router = express.Router()
const userRoute = require("../users")
const leaveRoute = require("../leaves")

router.use("/user", userRoute)

router.use("/leave", leaveRoute)

module.exports = router
const express = require("express")
const router = express.Router()
const userController = require("./user.controller")

router.post('/register', userController.register)

router.get("/verify", userController.verify)

module.exports = router
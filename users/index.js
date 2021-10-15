const express = require("express")
const router = express.Router()
const userController = require("./user.controller")

router.get('/register', userController.register())

module.exports = router
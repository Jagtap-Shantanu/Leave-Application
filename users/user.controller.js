const userServices = require("./user.services")

const register = (req, res) => {
    userServices.addUser(req.body)
    res.send(re.body)
}

module.exports = {
    register
}
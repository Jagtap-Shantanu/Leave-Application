const isAuthorised = (req, res, next) => {
    const loginToken = req.headers["logintoken"]
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<", loginToken)
    res.send({loginToken})
}

module.exports = {
    isAuthorised
}

const express = require("express")
const bodyparser = require("body-parser")
const Mongoose = require("mongoose")
const routes = require("./routes")

const dburl = "mongodb://localhost:27017/leaveApplication"

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(express.json())
app.use(routes)

Mongoose.connect(dburl).then(function(){
    console.log("Connetcted to database")

    app.listen(PORT, () => {
    console.log("Server running on ", PORT)
    })

}, function(error){
    console.log("Error in connecting to mongodb", error.message)
})



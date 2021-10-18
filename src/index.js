const express = require("express")
const bodyparser = require("body-parser")
const Mongoose = require("mongoose")
const routes = require("./routes")
const cron = require("node-cron")
const notifyAdmin = require("../services/mailNotification")
require("dotenv").config()

//For scheduling emails every 24 hours :-  * */24 * * *
cron.schedule('*/5 * * * *', () => {
    //notifyAdmin.sendNotificationToAdmin()
    console.log('running every minute 1, 2, 4 and 5');
  });

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
app.use(routes)

Mongoose.connect(process.env.DBURL).then(function(){
    console.log("Connetcted to database")

    app.listen(PORT, () => {
    console.log("Server running on ", PORT)
    })

}, function(error){
    console.log("Error in connecting to mongodb", error.message)
})



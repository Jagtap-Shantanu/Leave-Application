const express = require("express")
const bodyparser = require("body-parser")
const Mongoose = require("mongoose")
const routes = require("./routes")
const cron = require("node-cron")
const notifyAdmin = require("../services/mailNotification")
const multer = require("multer")
const fs = require("fs")
const service = require("../services/upload.services")
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

var details

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync("./uploads")) {
            fs.mkdirSync("./uploads")
        }
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
      details = file
    }
  })
  
const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), (req, res) => {
    console.log("File received", req.file)

    service.sendToCloud(details.originalname).then((url) => {
        details.url = url
        console.log(details)
        service.addToTextFile(details).then(() => {
            console.log("Data added to textfile")
            res.send({status: "Success", details})
            //res.send(details)
        }).catch((err) => {
            console.log("Error occured", err)
            res.send(err)
        })
    }).catch((err) => {
        res.send(err)
    })
})

app.get("/", (req, res) => {
    res.send("Welcome to Leave reporting application!!")
})

Mongoose.connect(process.env.DBURL_LIVE).then(function(){
    console.log("Connetcted to database")

    app.listen(PORT, () => {
    console.log("Server running on ", PORT)
    })

}, function(error){
    console.log("Error in connecting to mongodb", error.message)
})



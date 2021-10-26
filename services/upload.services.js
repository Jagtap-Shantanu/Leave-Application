var cloudinary = require('cloudinary').v2
const fs = require("fs")
const path = require("path")
require("dotenv").config()

console.log("cloudinary credentials", process.env.API_KEY, process.env.CLOUD_NAME, process.env.API_SECRET)

exports.sendToCloud = (filename) => {

    return new Promise((resolve, reject) => {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        })
     
        var filePath = path.resolve(__dirname + "/../uploads/" + filename)
        console.log("Uploading...", filePath)
    
        cloudinary.uploader.upload(filePath, {
            resource_type: "image"
        }).then((data) => {
    
            console.log("Uploaded")
            var secureURL = data.secure_url        
            console.log("Success ", secureURL)
            //var filepath = path.resolve(__dirname + "/uploads/" + filename)

            fs.unlinkSync(filePath)
            console.log("File dateled from uploads folder")

            resolve(secureURL)
        }).catch((err) => {
            console.log(err)
            reject(err)
        })    
    })
}

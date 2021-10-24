var cloudinary = require('cloudinary').v2
const fs = require("fs")
const path = require("path")

exports.sendToCloud = (filename) => {

    return new Promise((resolve, reject) => {
        cloudinary.config({
            cloud_name: "dz0yaecxs",
            api_key: "184326487576423",
            api_secret: "xUIeQDlPEgo49v3ebbx9gjHuG5c"
        })
    
    
        console.log("Uploading...")
    
        cloudinary.uploader.upload(__dirname + "/uploads/" + filename, {
            resource_type: "image"
        }).then((data) => {
    
            console.log("Uploaded")
            var secureURL = data.secure_url        
            console.log("Success ", secureURL)
            var filepath = path.resolve(__dirname + "/uploads/" + filename)

            fs.unlinkSync(filepath)
            console.log("File dateled from uploads folder")

            resolve(secureURL)
        }).catch((err) => {
            console.log(err)
            reject(err)
        })    
    })
}

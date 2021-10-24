//require("dotenv").config()
const LeaveModel = require("./leaves/leave.model")

//console.log(process.env.EMAIL)

//const cron = require("node-cron")
//const mailer = require("./services/mailer")


//  var mailDetails = {
//     from: process.env.EMAIL,
//     to: "shantanujagtap93@gmail.com",
//     subject: "No reply plz",
//     html: `<p>Hey just testing the node-cron module</p>`
// }

// const getPendingLeaves = () => {
//     console.log("inside getPendingLeaves")
//     return new Promise((resolve, reject) => {
//         LeaveModel.find({status: "pending"}).then((leaveIDs) => {
//             console.log("leaveIDs", leaveIDs)
//             resolve(leaveIDs)
//         }).catch((err) => {
//             console.log(err.message)
//             reject(err)
//         })
//     })
// }

// getPendingLeaves().then((data) => {
//     console.log("data", data)
// }).catch((err) => {
//     console.log(err)
// })

//mailer.sendMail(mailDetails)
// console.log(new Date().getMinutes())

// cron.schedule('* */1 * * * *', () => {
//   console.log('running every minute to 1 from 5');
// })


// const fs = require('fs');
// const excel = require('exceljs');

// // Create a connection to the MongoDB database
// // MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
// //   if (err) throw err;
  
// //   let dbo = db.db("gkzdb");
  
//     LeaveModel.find({userID: "2c7b3991351"}).then((data) => {
//         console.log(result);
//         let workbook = new excel.Workbook(); //creating workbook
// 	    let worksheet = workbook.addWorksheet('LeavesByUserID'); //creating worksheet

//         worksheet.addRows(result);
	
//         // Write to File
//         workbook.xlsx.writeFile("LeavesByUserID.xlsx").then(function() {
//             console.log("file saved!");
//         }).catch((err) => {
//             console.log("Error is ", err)
//         })
        
//     }).catch((err) => {
//         consle.log("error is ************", err)
//     })
    


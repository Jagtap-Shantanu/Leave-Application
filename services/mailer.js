const nodemailer = require('nodemailer')
require("dotenv").config()

let mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD
	}
});

var setBody = (email, url) => {
    var string = `Click <a href= ${url} > here </a> to verify`
    console.log(string)
    var mailDetails = {
        from: process.env.EMAIL,
        to: email,
        subject: "No reply plz",
        html: string
    }
    //console.log(mailDetails)

    return mailDetails
}

var setSuggestionBody = (email, body, leaveID) => {
    console.log(body)
    var mailDetails = {
        from: process.env.EMAIL,
        to: email,
        subject: `Suggestion to your report ID-${leaveID}`,
        html: `<p>${body.suggestion}</p>`
    }
    //console.log(mailDetails)

    return mailDetails
}

var setApproveBody = (email, leaveID) => {
    var mailDetails = {
        from: process.env.EMAIL,
        to: email,
        subject: `Approved your report ID-${leaveID}`,
        html: `<p>Your report is successfully approved</p>`
    }
    console.log(mailDetails)

    return mailDetails
}

var setRejectBody = (email, leaveID) => {
    var mailDetails = {
        from: process.env.EMAIL,
        to: email,
        subject: `Rejected your report ID-${leaveID}`,
        html: `<p>Your report is rejected due to some invalid data</p>`
    }
    console.log(mailDetails)

    return mailDetails
}

var setReportBody = (email, leaveID) => {
    var mailDetails = {
        from: process.env.EMAIL,
        to: email,
        subject: `Submitted your report ID-${leaveID}`,
        html: `<p>Your report is submitted and admin will look into it shortly</p>`
    }
    console.log(mailDetails)

    return mailDetails
}

var setAdminBody = (email, leaveID, userID) => {
    var mailDetails = {
        from: process.env.EMAIL,
        to: email,
        subject: `New report ID-${leaveID}`,
        html: `<p>User with ID-${userID} has reported a leave application</p>`
    }
    console.log(mailDetails)

    return mailDetails
}

function sendMail(details) { 
    return new Promise((resolve, reject) => {
        mailTransporter.sendMail(details, function(err, data) {
            if(err) {
                console.log('Error Occured');
                reject(err)
            } else {
                console.log('Email sent successfully', data);
                resolve(data)
            }
        })
    })
}

module.exports = {
    sendMail,
    setBody,
    setSuggestionBody,
    setApproveBody,
    setRejectBody,
    setReportBody,
    setAdminBody
}

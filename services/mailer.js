const nodemailer = require('nodemailer')

let mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: '1805006@ritindia.edu',
		pass: 'rit@shaw'
	}
});

var setBody = (email, url) => {
    var string = `Click <a href= ${url} > here </a> to verify`
    console.log(string)
    var mailDetails = {
        from: '1805006@ritindia.edu',
        to: email,
        subject: "No reply plz",
        html: string
    }
    //console.log(mailDetails)

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
    setBody
}

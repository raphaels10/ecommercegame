const env = require("../.env")
const nodemailer = require('nodemailer')

const myEmail = "ahostprovider1207@gmail.com"

module.exports = {
    transport: nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: myEmail,
            pass: env.smtpPass
        },
        tls: {
            rejectUnauthorized: false
        },
    }),
    myEmail

}

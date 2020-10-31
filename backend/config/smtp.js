const env = require("../.env")
const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "ahostprovider1207@gmail.com",
        pass: env.smtpPass
    },
    tls: {
        rejectUnauthorized: false
    },
})


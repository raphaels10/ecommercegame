const User = require('../database/user')
const transporter = require('../config/smtp')
const env = require('../.env')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const email = req.body.email || ''

    User.findOne({ email }, (err, user) => {
        if (err) return res.status(400).send({ error: "Erro na solicitação com o servidor" })
        if (!user) return res.status(400).send({ error: "Não foi possível encontrar uma conta associada a este e-mail" })
        const token = jwt.sign({ email }, env.secret, {
            expiresIn: "7 days"
        }, (err, token) => {
            if (err) return res.status(400).send({ error: "Erro na solicitação com o servidor" })
            transporter.sendMail({
                subject: "Password Change",
                from: "App Provider <ahostprovider1207@gmail.com>",
                to: user.email,
                html: `
                <h2>Hello, ${user.username}! </h2>
                <p>to change your password, please access this <a href="http://localhost:3000/recover/${token}">link</a> </p>
            `
            }).then(res.send("Um e-mail de recuperação foi enviado. Cheque a caixa de mensagem ou a pasta de spam"))
            .catch(res.status(400).send({error: "Erro na solicitação com o servidor"}))
        })
    })


}
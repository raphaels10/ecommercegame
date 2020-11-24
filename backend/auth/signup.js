const bcrypt = require('bcrypt')
const User = require('../database/user')
const transporter = require('../config/smtp').transport
const myEmail = require('../config/smtp.js').myEmail
const jwt = require('jsonwebtoken')
const env = require('../.env')
const parseValidationErrors = require('../errorhandlers/validation')


const email_regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const pass_regex = /^\S{8,20}$/



module.exports = async (req, res, next) => {
    const name = req.body.name || ''
    const username = req.body.username || ''
    const email = req.body.email || ''
    const password = req.body.password || ''
    const confirmPassword = req.body.confirmPassword || ''
    const fileURL = req.body.fileURL || ''

    if (!password.match(pass_regex)) return res.status(400).send({error: ["Senha deve ter de 8 a 20 dígitos"]})
    if (!email.match(email_regex)) return res.status(400).send({error: ["E-mail inválido"]})
     
    const hashedPassword = await bcrypt.hash(password, 10)
    const isSamePass = await bcrypt.compare(confirmPassword, hashedPassword)
    if (!isSamePass) return res.status(400).send({error: ["Senhas não conferem"]})

    User.findOne({$or: [{username}, {email}]}, (err, user) => {
        if(err) return res.status(400).send({error: ["Erro de conexão. Tente novamente mais tarde"]})
        else if(user) {
            if (user.username === username) return res.status(400).send({error: ["Usuário já cadastrado"]})
            if (user.email === email) return res.status(400).send({error: ["Email já cadastrado"]})
        }
        else {
            const newUser = new User({name, username, email, password: hashedPassword, profilePic: fileURL})
            newUser.save()
            .then((user) => {
                const {username} = user
                const token = jwt.sign({username}, env.secret, {
                    expiresIn: "7 days"
                }, (err, token) => {
                    if(err) return res.status(400).send({error: ["Erro na solicitação com o servidor"]})
                    transporter.sendMail({
                        subject: "Account confirmation",
                        from: `App Provider <${myEmail}>`,
                        to: user.email, 
                        html: `
                            Thank you for your registration! To confirm your email address, please access 
                            <a href="http://localhost:3001/confirm/${token}">this link</a>
                        `
                    })
                })
                
               return res.send("Cadastro realizado com sucesso! Enviamos um e-mail para confirmar sua conta")
            })
            .catch(e => {
                parseValidationErrors(e, res)
            }
                )
        }
    })


}
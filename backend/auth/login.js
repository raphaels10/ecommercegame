const bcrypt = require('bcrypt')
const User = require('../database/user')
const jwt = require('jsonwebtoken')
const env = require('../.env')

module.exports = (req, res, next) => {
    const username = req.body.username || ''
    const password = req.body.password || ''

    User.findOne({username}).then(user => {
       bcrypt.compare(password, user.password).then(r => {
           if(r) {
                if(!user.confirmed) return res.status(400).send({error: "Usuário não validado! Verifique o e-mail"})
                const random = Math.floor(Math.random() * 1000000000)
                const userObject = {user: {
                    username,
                    name: user.name
                }} 
                const token = jwt.sign({...userObject, csrf_token: random}, env.secret, {
                    expiresIn: "3 hours"
                })
                console.log(token)
                return res.status(200).cookie('CSRF_id', token, { secure: false, httpOnly: true, expires: new Date(new Date().getTime()+ 3*60*60*1000) })
                .json({username, name: user.name, token: random})
           }
           else res.status(400).send({error: "Usuário e; ou senha inválido(s)"})
       })
    })
    .catch(e => {
        res.status(400).send({error: "Usuário e;ou senha inválido(s)"})
    })
}
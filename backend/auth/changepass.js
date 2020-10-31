const jwt = require("jsonwebtoken")
const env = require("../.env")
const bcrypt = require('bcrypt')
const User = require('../database/user')


module.exports = async (req, res, next) => {
    const {token, password, confirmPassword} = req.body
    jwt.verify(token, env.secret, async (err, decoded) => {
        if (err) res.status(400).send({error: "Token inválido ou expirado"})
        const {email} = decoded || ''
        const hashedPass = await bcrypt.hash(password, 10)
        bcrypt.compare(confirmPassword, hashedPass, (err, same) => {
            if(err) res.status(400).send({error: "Erro na solicitação com o servidor"})
            if(!same) res.status(400).send({error: "Senhas não conferem"})
            User.findOneAndUpdate({email}, {"$set": {password: hashedPass}}, (err, user) => {
                if(err) res.status(400).send({error: "Erro na solicitação com o servidor"})
                res.send("Senha alterada com sucesso!")
            })
        })

    })

}
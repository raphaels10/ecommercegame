const jwt = require("jsonwebtoken")
const env = require("../.env")
const bcrypt = require('bcrypt')
const User = require('../database/user')


module.exports = async (req, res, next) => {
    const {token, password, confirmPassword} = req.body
    jwt.verify(token, env.secret, async (err, decoded) => {
        if (err) return res.status(400).send({error: "Token inválido ou expirado"})
        const {email} = decoded || ''
        console.log(decoded)
        const hashedPass = await bcrypt.hash(password, 10)
        bcrypt.compare(confirmPassword, hashedPass, (err, same) => {
            if(err) return res.status(400).send({error: "Erro na solicitação com o servidor"})
            if(!same) return res.status(400).send({error: "Senhas não conferem"})
            User.findOneAndUpdate({email}, {"$set": {password: hashedPass}}, (err, user) => {
                if(err) return res.status(400).send({error: "Erro na solicitação com o servidor"})
                return res.send("Senha alterada com sucesso!")
            })
        })

    })

}
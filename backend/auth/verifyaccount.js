const env = require('../.env')
const jwt = require('jsonwebtoken')
const User = require('../database/user')

module.exports = (req, res, next) => {
    const token = req.params.token
    const csrf_token = req.body.token || ''
    jwt.verify(token, env.secret, (err, decoded) => {
        const {username} = decoded
        if (err) return res.status(400).send("Token expirado ou inválido")
        User.findOneAndUpdate({username}, { '$set': {confirmed: true} }, (err, r) => {
            if (err) return res.status(400).send({error: "Erro na solicitação com o servidor"})
            return res.send("Conta confirmada com sucesso!")
        } )

    })
    
}
const jwt = require('jsonwebtoken')
const env = require('../.env')
const User = require('../database/user')

module.exports = (req, res, next) => {
    const token = req.cookies['CSRF_id'] || ''
    const csrf_token = req.body.token || ''
    jwt.verify(token, env.secret, (err, decoded) => {
        if (err){
             return res.status(400)
             .cookie('CSRF_id', "", { secure: false, httpOnly: true, expires: new Date(new Date().getTime()+ 1) })
             .send({error: "Falha ao verificar token"})
        }
        if (decoded.csrf_token !== csrf_token) {        
            res.status(400)
            .cookie('CSRF_id', "", { secure: false, httpOnly: true, expires: new Date(new Date().getTime()+ 1) })
            .send({error: "Falha ao verificar token"})

        }
        const username = decoded.user.username
        const name = decoded.user.name
        User.findOne({username}, (err, user) => {
            if (err || !user) return res.status(400).json({error: ["Falha ao verificar token"]})
            return res.send({username, name, products: user.productsId})

            
        })

        
    })
}
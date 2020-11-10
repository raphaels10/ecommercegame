const jwt = require('jsonwebtoken')
const env = require('../.env')
const Product = require('../database/products')
const User = require('../database/user')

module.exports = (req, res, next) => {
    const {id} = req.params
    const token = parseFloat(req.headers.authorization.split(" ")[1]) || ''
    const cookie_payload = req.cookies['CSRF_id'] || ''


    jwt.verify(cookie_payload, env.secret, (err, decoded) => {
        if(err) return res.status(400).send({error: ['Usuario não validado 1']})
        if(decoded.csrf_token !== token) return res.status(400).send({error: ['Usuário não validado 2']})

        Product.findOneAndDelete({_id: id, seller: decoded.user.username}, (err, product) => {
            if(!product || err) return res.status(400).send({error: ["Produto não encontrado"]})

            

            User.findOneAndUpdate({username: decoded.user.username}, {$pull: {productsId: id}}, (err, p) => {
                if(!p || err) return res.status(400).send({error: ["Produto não encontrado"]})
                return res.send("Produto removido")
            })


        })
    })
}
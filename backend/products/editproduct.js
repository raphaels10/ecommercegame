const jwt = require('jsonwebtoken')
const env = require('../.env')
const Product = require('../database/products')

module.exports = (req, res, next) => {
    const {description, productId} = req.body
    const token = req.body.token || ''
    const price = parseFloat(req.body.price)
    const stock = parseFloat(req.body.quantity)
    const cookie_payload = req.cookies['CSRF_id'] || ''

    jwt.verify(cookie_payload, env.secret, (err, decoded) => {
        if(err) return res.status(400).send({error: ['Usuario não validado']})
        if(decoded.csrf_token !== token) return res.status(400).send({error: ['Usuário não validado']})

        Product.findOneAndUpdate({_id: productId, seller: decoded.user.username}, 
            {$set: {description, price, stock}}).then(r => {
                if(!r) return res.status(400).json({error: ["No products found"]})
                return res.send("Produto alterado com sucesso!")
            }
               
            )
            .catch(e => {
                return res.status(401).json({error: ["Forbidden"]})
            })
        
    }
    )
}
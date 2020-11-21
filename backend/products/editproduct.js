const jwt = require('jsonwebtoken')
const env = require('../.env')
const Product = require('../database/products')

module.exports = (req, res, next) => {
    const {description, productId} = req.body
    const price = parseFloat(req.body.price)
    const stock = parseFloat(req.body.quantity)
    const {decoded} = res.locals

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
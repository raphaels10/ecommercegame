const Product = require('../database/products')
const User = require('../database/user')
const parseErrors = require('../errorhandlers/validation')
const jwt = require('jsonwebtoken')
const env = require('../.env')

module.exports = (req, res, next) => {
    const {images, name, game, description} = req.body
    const price = parseFloat(req.body.price)
    const stock = parseFloat(req.body.stock)
    const {decoded} = res.locals

        new Product({images, name, game, description, price, stock, seller: decoded.user.username}).save()
        .then(product => {
           User.findOneAndUpdate({username: decoded.user.username}, {$push: { productsId: product._id }}, {
                 useFindAndModify: false  
           },
                (err, document) => {
                    if (err) return res.status(400).send({error: ['Falha ao cadastrar produto']})
                    return res.json({id: product._id})
                } )
        })
        .catch(e => {
            parseErrors(e, res)
        })
    

}
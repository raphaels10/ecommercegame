const Product = require('../database/products')
const User = require('../database/user')
const parseErrors = require('../errorhandlers/validation')
const jwt = require('jsonwebtoken')
const env = require('../.env')

module.exports = (req, res, next) => {
    const {images, name, game, description, token} = req.body
    const price = parseFloat(req.body.price)
    const stock = parseFloat(req.body.stock)
    const cookie_payload = req.cookies['CSRF_id'] || ''

    jwt.verify(cookie_payload, env.secret, (err, decoded) => {
        if(err) return res.status(400).send({error: ['Usuario não validado']})
        if(decoded.csrf_token !== token) return res.status(400).send({error: ['Usuário não validado']})

        new Product({images, name, game, description, price, stock, userId: decoded.user._id}).save()
        .then(product => {
           User.findByIdAndUpdate(decoded.user._id, {$push: { productsId: product._id }}, {
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
    })

}
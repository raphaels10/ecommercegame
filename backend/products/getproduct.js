const Product = require('../database/products')
const User = require('../database/user')
module.exports = (req, res, next) => {
    const {id} = req.params
    Product.findById(id, (err, product) => {
        if (err || !product) return res.status(400).json({errors: ['Produto não encontrado']})
        
        User.findOne({username: product.seller}, (err, user) => {
            if (err) return res.status(400).json({error: ["Database error"]})
            if (!user) return res.status(400).json({error: ["Database error"]})

            return res.json(product)

        })
    })
}
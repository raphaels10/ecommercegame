const Product = require('../database/products')
const User = require('../database/user')
module.exports = (req, res, next) => {
    const {id} = req.params
    Product.findById(id, (err, product) => {
        if (err) return res.status(400).json({errors: ['Produto não encontrado']})
        
        User.findById(product.userId, (err, user) => {
            if (err) return res.status(400).json({error: ["Database error"]})
            if (!user) return res.status(400).json({error: ["Database error"]})

            const productCopy = {
                id: product._id,
                images: product.images,
                game: product.game, 
                name: product.name, 
                stock: product.stock,
                price: product.price,
                description: product.description, 
                seller: user.username
            }
            return res.json(productCopy)

        })
    })
}
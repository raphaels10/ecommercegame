const Product = require('../database/products')

module.exports = (req, res, next) => {
    Product.find((err, products) => {
        if (err) return res.status(400).json({error: ["Não foi possível resgatar os produtos"]})
        return res.json(products)
    })
}
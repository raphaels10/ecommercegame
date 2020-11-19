const Product = require('../database/products')

module.exports = (req, res, next) => {
    const query = req.query
    console.log(req.query)
    Product.find((err, products) => {
        if (err) return res.status(400).json({error: ["Não foi possível resgatar os produtos"]})
        if (Object.keys(query).length > 0) {
            var filtered = []
            for (key in query) {
                if (key === "name") {
                    const nextFiltered = products.filter(p =>
                         p.name.toLowerCase().includes(query.name.toLowerCase()) || p.game.toLowerCase().includes(query.name.toLowerCase())
                         )
                    filtered = filtered.concat(nextFiltered)
                    continue
                }
                try {
                const nextFiltered = products.filter(p => p[key].toLowerCase() === query[key].toLowerCase())
                filtered = filtered.concat(nextFiltered)
                }
                catch (e) {
                    break
                }
            }

            return res.json(filtered)

        }
        return res.json(products)
    })
}
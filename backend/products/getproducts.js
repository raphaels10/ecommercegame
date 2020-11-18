const Product = require('../database/products')

module.exports = (req, res, next) => {
    const query = req.query
    Product.find((err, products) => {
        if (err) return res.status(400).json({error: ["Não foi possível resgatar os produtos"]})
        if (Object.keys(query).length > 0) {
            var filtered = []
            for (key in query) {
                if (key === "name") {
                    console.log("entrou no if")
                    const nextFiltered = products.filter(p =>
                         p.name.toLowerCase().includes(query.name.toLowerCase()) || p.game.toLowerCase().includes(query.name.toLowerCase())
                         )
                    console.log(nextFiltered)
                    filtered = filtered.concat(nextFiltered)
                    console.log(filtered)
                    continue
                }
                const nextFiltered = products.filter(p => p[key].toLowerCase() === query[key].toLowerCase())
                filtered = filtered.concat(nextFiltered)
            }

            return res.json(filtered)

        }
        return res.json(products)
    })
}
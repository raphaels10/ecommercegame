const jwt = require('jsonwebtoken')
const env = require('../.env')

module.exports = (req, res, next) => {
    const { csrf_token } = req.body
    const token = req.cookies['CSRF_id'] || ''

    jwt.verify(token, env.secret, (err, decoded) => {

        if (err) return res.status(400).json({ error: ["Acesso negado"] })

        if (decoded.csrf_token !== csrf_token) return res.status(401).json({ error: ["Acesso negado"] })

        res.locals.decoded = decoded
        
        next()

    }
    )

}
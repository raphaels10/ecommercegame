const jwt = require('jsonwebtoken')
const env = require('../.env')
const User = require('../database/user')

module.exports = (req, res, next) => {
    const csrf_token = req.body.token || ''
    const token = req.cookies['CSRF_id'] || ''
    jwt.verify(token, env.secret, (err, decoded) => {
        if (err) return res.status(401).json({error: ['Unauthorized 1']})
        if (decoded.csrf_token !== csrf_token) return res.status(401).json({error: ['Unauthorized 2']})
        User.findOne({username: decoded.user.username})
        .then(user => {
            res.json({profilePic: user.profilePic, productsId: user.productsId, messagesReceived: user.messages})
        })
        .catch(error => {
            res.status(400).json({error: ['Failed retrieving user info']})
        })

    })
}
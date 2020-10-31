const User = require('../database/user')

module.exports = (req, res, next) => {
    const {username} = req.body
    User.findOne({username}, (err, user) => {
        if (err) return res.status(400).json({error: ["Usuário não encontrado"]})
        if(!user) return res.status(400).json({error: ["Usuário não encontrado"]})
        return res.json(user.username)
    })
}
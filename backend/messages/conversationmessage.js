const User = require('../database/user')
const jwt = require('jsonwebtoken')
const env = require('../.env')

function post(req, res, next) {
    const { csrf_token, message } = req.body
    const conversationId = req.params.id
    const token = req.cookies['CSRF_id'] || ''

    jwt.verify(token, env.secret, (err, decoded) => {

        if (err) return res.status(400).json({ error: ["Forbidden"] })

        if (decoded.csrf_token !== csrf_token)  res.status(401).json({error: ["Forbidden"]})    
            
        User.find({ "messages._id": conversationId }).then(users => {

            if (!users.some(user => user.username === decoded.user.username)) {
                return res.status(402).json({ error: ["Forbidden"] })
            }

            User.updateMany({ "messages._id": conversationId }, {
                $push: { "messages.$.messages": { text: message, from: decoded.user.username } }
            })
                .then(r => res.json(r))
                .catch(e => res.status(403).json({error: ["Forbidden"]}))


        })
        .catch(e => {
            res.status(405).json({error: ["Forbidden"]})
            console.log(e)
        })
    })



}

function get(req, res, next) {
    const conversationId = req.params.id
    User.findOne({ "messages._id": conversationId })
        .then(user => {
            const user_conversation = user.messages
                .filter(conversation => conversation._id.toString() === conversationId)[0]

            res.json(user_conversation)

        })
        .catch(e => res.status(401).send({ error: ["Unauthorized"] }))
}

module.exports = { post, get }
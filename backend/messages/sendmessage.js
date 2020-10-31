const User = require('../database/user')
const jwt = require('jsonwebtoken')
const env = require('../.env')

module.exports = (req, res, next) => {

    const {csrf_token} = req.body
    const token = req.cookies['CSRF_id'] || ''
    jwt.verify(token, env.secret, (err, decoded) => {
        if (err) return res.status(401).send({error: ['Not authorized']})

        if (decoded.csrf_token !== csrf_token) { 
            return res.status(401).send({error: ['Not authorized']})
        }

        const conversation = req.body || ''
        console.log(conversation.from)
    
        
        User.updateMany({$or: [{username: decoded.user.username}, {username: conversation.to}]}, {
            $push: {
                messages: {
                    from: decoded.user.username,
                    to: conversation.to,
                    title: conversation.title,
                    messages: [conversation.message]
                }
            }
        }).then(r => res.send("Sucesso!"))
        .catch(r => res.status(400).json({error: ['Database update failed']}))



    })
   
}
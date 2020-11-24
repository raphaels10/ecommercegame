const User = require('../database/user')
const jwt = require('jsonwebtoken')
const env = require('../.env')
const parseErrors = require('../errorhandlers/validation')

module.exports = (req, res, next) => {

    const { decoded } = res.locals
    const conversation = req.body || ''
    console.log(conversation.from)


    User.updateMany({ $or: [{ username: decoded.user.username }, { username: conversation.to }] }, {
        $push: {
            messages: {
                from: decoded.user.username,
                to: conversation.to,
                title: conversation.title,
                messages: [conversation.message]
            }
        }
    }, {
        runValidators: true
    }).then(r => res.send("Sucesso!"))
        .catch(e => {
            try {
                if(e.errors.messages.errors) {
                    return res.status(401).json({error: ["Os campos de título e texto são obrigatórios"]})
                }
                else {
                    return res.status(400).json({ error: ['Database update failed'] })
                }
            }
            catch(err){
                return res.status(400).json({ error: ['Database update failed'] })
            }
        })





}
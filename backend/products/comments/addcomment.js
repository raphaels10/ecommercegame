const env = require('../../.env')
const jwt = require('jsonwebtoken')
const Product = require('../../database/products')

module.exports = (req, res, next) => {
    const {text, productId} = req.body
    console.log(req.body.replyId)
    const token = req.cookies['CSRF_id'] || ''
    const csrf_token = req.body.token || ''


    jwt.verify(token, env.secret, (err, decoded) => {
        if (err) return res.status(400).json({error: ['Not authenticated']})
            
        if (decoded.csrf_token !== csrf_token) return res.status(401).json({error: ['Forbidden']})
        
        const commentary = {
            author: decoded.user.username,
            text
        }

        if(req.body.replyId) {
            Product.findOneAndUpdate({"comments._id" : req.body.replyId}, 
            {$push: {"comments.$.replies": commentary}}, (err, product) => {
                if (err) return res.status(400).json({error: ["Database Error"]})
                if (!product) return res.status(400).json({error: ["Product not found"]})
                res.send("Resposta adicionada!")
            })
        }
        if (!req.body.replyId){
        Product.findByIdAndUpdate(productId, {$push: {comments: commentary}}, (err, product) => {
            if (err) return res.status(400).json({error: ["Database Error"]})
            if (!product) return res.status(400).json({error: ["Product not found"]})
            res.send("Comentário adicionado!")
        })
    }
    })


}
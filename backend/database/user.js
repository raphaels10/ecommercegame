const mongoose = require('mongoose')
const database = require('./database.js')


const messageSchema = new mongoose.Schema({
    createdAt: {type: Date, default: Date.now },
    from: {type: String, required: true },
    text: {type: String, required: [true, "Texto é obrigatório"]}
})


const conversationSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    title: {type: String, required: [true, "Título é obrigatório!"]},
    messages: [messageSchema]
})


const UserSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: [3, "Nome precisa ter pelo menos 3 caracteres"], maxlength: 30},
    username: {type: String, required: true, unique: true, minlength: [4, "Usuário precisa ter pelo menos 4 caracteres"]},
    email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true},
    confirmed: {type: Boolean, default: false},
    profilePic: {type: String},
    productsId: [{type: String }],
    messages: [conversationSchema]
})

module.exports = mongoose.model('User', UserSchema)


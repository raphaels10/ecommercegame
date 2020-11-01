const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    game: {type: String, required: [true, "Campo jogo obrigatório"]},
    name: {type: String, required: [true, "Campo nome obrigatório"]},
    price: {type: Number, required: [true, "Campo preço obrigatório"], min: [0, "Preço deve ser zero ou mais"]},
    description: {type: String, required: [true, "Campo descrição obrigatório"]},
    stock: {type: Number, required: [true, "Campo estoque obrigatório"], min: [1, "Estoque deve ser maior ou igual a 1"]},
    isMain: {type: Boolean, default: true},
    seller: {type: String, required: true},
    images: [{type: String}]    
})

module.exports = mongoose.model('Product', ProductSchema)

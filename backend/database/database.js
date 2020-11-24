const mongoose = require('mongoose')
mongoose.Promise = global.Promise
module.exports = mongoose.connect('mongodb://localhost/testauth', {useNewUrlParser: true}).then(() => {
    console.log("DB conectada")
}).catch(e => console.log(e))






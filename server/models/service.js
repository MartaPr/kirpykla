const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const serviceSchema = mongoose.Schema({
    name: {
        require: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
})

const Service = mongoose.model('Service', serviceSchema)
module.exports = { Service }
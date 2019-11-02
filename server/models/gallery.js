const mongoose = require('mongoose')

const gallerySchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        unique: 1,
        maxlength: 1000
    },
    images: {
        type: Array,
        default: []
    }
})

const Gallery = mongoose.model('Gallery', gallerySchema)
module.exports = { Gallery }
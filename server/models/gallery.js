const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
  images: {
    type: Array,
    default: [],
  },
});

const Gallery = mongoose.model('Gallery', gallerySchema);
module.exports = { Gallery };

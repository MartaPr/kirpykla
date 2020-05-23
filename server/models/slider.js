const mongoose = require('mongoose');

const SliderSchema = mongoose.Schema({
  title: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 1000,
  },
  description: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 1000,
  },
  image: {
    type: Array,
    default: [],
  },
  publish: {
    required: true,
    type: Boolean,
  },
});

const Slider = mongoose.model('Slider', SliderSchema);
module.exports = { Slider };

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      maxlength: 100000,
    },
    price: {
      required: true,
      type: Number,
      maxlength: 255,
    },
    publish: {
      required: true,
      type: Boolean,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
module.exports = { Product };

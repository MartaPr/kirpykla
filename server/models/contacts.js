const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactsSchema = mongoose.Schema({
  address: {
    required: true,
    type: String,
    maxlength: 100000,
  },
  phone: {
    required: true,
    type: Number,
    maxlength: 255,
  },
  email: {
    required: true,
    type: String,
    maxlength: 255,
  },
});

const Contacts = mongoose.model('Contacts', ContactsSchema);
module.exports = { Contacts };

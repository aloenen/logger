const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    uid: { type: Number, required: true, unique: true },
    name: String,
    description: String
  },
  {
    collection: 'Contacts',
    read: 'nearest'
  }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
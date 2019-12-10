const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    uid: { type: Number, required: true, unique: true },
    attendees: Array,
    date: Number,
    description: String,
    location: String,
    title: String
  },
  {
    collection: 'Events',
    read: 'nearest'
  }
);

const Event = mongoose.model('Events', eventSchema);

module.exports = Event;
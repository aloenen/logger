const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    uid: { type: Number, required: true, unique: true },
    title: String,
    start: Date,
    end: Date,
    description: String
  },
  {
    collection: 'Events',
    read: 'nearest'
  }
);

const Event = mongoose.model('Events', eventSchema);

module.exports = Event;
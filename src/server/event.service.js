const Event = require('./event.model');
const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();

function getEvents(req, res) {
  const docquery = Event.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(events => {
      res.status(200).json(events);
    })
    .catch(error => {
      res.status(500).send(error);
      return;
    });
}


module.exports = {
  getEvents
};
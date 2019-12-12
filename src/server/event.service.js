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

function postEvent(req, res) {
  const originalEvent = { uid: req.body.uid, title: req.body.title, start: req.body.start, end: req.body.end, description: req.body.description };
  const event = new Event(originalEvent);
  event.save(error => {
    if (checkServerError(res, error)) return;
    res.status(201).json(event);
    console.log('Event created successfully!');
  });
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}


module.exports = {
  getEvents,
  postEvent
};
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

function deleteEvent(req, res) {
  const uid = parseInt(req.params.uid, 10);
  Event.findOneAndRemove({ uid: uid })
    .then(event => {
      if (!checkFound(res, event)) return;
      res.status(200).json(event);
      console.log('Event deleted successfully!');
    })
    .catch(error => {
      if (checkServerError(res, error)) return;
    });
}
  
function checkFound(res, event) {
  if (!event) {
    res.status(404).send('Event not found.');
    return;
  }
  return event;
}


module.exports = {
  getEvents,
  postEvent,
  deleteEvent
};
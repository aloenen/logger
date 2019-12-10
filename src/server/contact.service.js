const Contact = require('./contact.model');
const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();

function getContacts(req, res) {
  const docquery = Contact.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(contacts => {
      res.status(200).json(contacts);
    })
    .catch(error => {
      res.status(500).send(error);
      return;
    });
}

function postContact(req, res) {
    const originalContact = { uid: req.body.uid, name: req.body.name, description: req.body.description, highschool: req.body.highschool, 
                              grade: req.body.grade, meetings: req.body.meetings, hometown: req.body.hometown, state: req.body.state, 
                              major: req.body.major };
    const contact = new Contact(originalContact);
    contact.save(error => {
      if (checkServerError(res, error)) return;
      res.status(201).json(contact);
      console.log('Contact created successfully!');
    });
  }
  
  function checkServerError(res, error) {
    if (error) {
      res.status(500).send(error);
      return error;
    }
  }

function putContact(req, res) {
  const originalContact = {
    uid: parseInt(req.params.uid, 10),
    name: req.body.name,
    description: req.body.description,
    highschool: req.body.highschool,
    grade: req.body.grade,
    meetings: parseInt(req.body.meetings, 10),
    hometown: req.body.meetings,
    state: req.body.state,
    major: req.body.major
  };
  Contact.findOne({ uid: originalContact.uid }, (error, contact) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, contact)) return;

    contact.name = originalContact.name;
    contact.description = originalContact.description;
    contact.highschool = originalContact.highschool;
    contact.grade = originalContact.grade;
    contact.meetings = originalContact.meetings;
    contact.hometown = originalContact.hometown;
    contact.state = originalContact.state;
    contact.major = originalContact.major;

    contact.save(error => {
      if (checkServerError(res, error)) return;
      res.status(200).json(contact);
      console.log('Contact updated successfully!');
    });
  });
}

function deleteContact(req, res) {
  const uid = parseInt(req.params.uid, 10);
  Contact.findOneAndRemove({ uid: uid })
    .then(contact => {
      if (!checkFound(res, contact)) return;
      res.status(200).json(contact);
      console.log('Contact deleted successfully!');
    })
    .catch(error => {
      if (checkServerError(res, error)) return;
    });
}
  
function checkFound(res, contact) {
  if (!contact) {
    res.status(404).send('Contact not found.');
    return;
  }
  return contact;
}

module.exports = {
  getContacts,
  postContact,
  putContact,
  deleteContact
};
const express = require('express');
const contactService = require('./contact.service');
const eventService = require('./event.service');
const router = express.Router();

router.get('/contacts', (req, res) => {
   contactService.getContacts(req, res);
});

router.get('/events', (req, res) => {
   eventService.getEvents(req, res);
})

router.post('/contact', (req, res) => {
   contactService.postContact(req, res);
});

router.put('/contact/:uid', (req, res) => {
   contactService.putContact(req, res);
 });
 
router.delete('/contact/:uid', (req, res) => {
   contactService.deleteContact(req, res);
});

module.exports=router;
'use strict';
module.exports = function(app) {
  var Contacts = require('../controllers/ContactController');

  // Contacts Routes
  app.route('/api/contact')
    .get(Contacts.list_contact)
    .post(Contacts.create_contact);
};
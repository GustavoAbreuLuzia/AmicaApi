'use strict';
module.exports = function(app) {
  var Contacts = require('../controllers/ContactController');

  // Contacts Routes
  app.route('/contact')
    .post(Contacts.create_contact);
};
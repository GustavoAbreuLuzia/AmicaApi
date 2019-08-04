'use strict';
module.exports = function(app) {
  var Pet = require('../controllers/AdoptController');

  // adopt Routes
  app.route('/adopt')
    .get(Pet.list_pets)
    .post(Pet.create_pet);

  app.route('/adopt/:petId')
    .get(Pet.find_pet)
    .put(Pet.update_pet)
    .delete(Pet.delete_pet);
};
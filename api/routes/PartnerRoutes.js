'use strict';
module.exports = function(app) {
  var Partner = require('../controllers/PartnerController');

  // Partner Routes
  app.route('/partner')
    .get(Partner.list_partners)
    .post(Partner.create_partner);

  app.route('/partner/:partnerId')
    .get(Partner.find_partner)
    .put(Partner.update_partner)
    .delete(Partner.delete_partner);
};
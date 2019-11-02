'use strict';
module.exports = function(app) {
  var Company = require('../controllers/CompanyController');

  // adopt Routes
  app.route('/api/company')
    .get(Company.list_companies)
    .post(Company.create_company);

  app.route('/api/company/:companyId')
    .get(Company.find_company)
    .put(Company.update_company)
    .delete(Company.delete_company);

  app.route('/api/company/admin/upload')
    .post(Company.upload_picture);
};
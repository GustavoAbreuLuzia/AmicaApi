'use strict';
module.exports = function(app) {
  var User = require('../controllers/UserController');

  // user Routes
  app.route('/usersAdmin')
    .get(User.list_users)
    .post(User.create_user);

  app.route('/usersAdmin/login')
    .post(User.login_user);

  app.route('/usersAdmin/login/logout')
    .delete(User.logout_admin);

  app.route('/usersAdmin/:userId')
    .get(User.find_user)
    .put(User.update_user)
    .delete(User.delete_user);
};
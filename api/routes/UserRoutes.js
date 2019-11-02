'use strict';
module.exports = function(app) {
  var User = require('../controllers/UserController');

  // user Routes
  app.route('/api/usersAdmin')
    .get(User.list_users)
    .post(User.create_user);

  app.route('/api/usersAdmin/login')
    .post(User.login_user);

  app.route('/api/usersAdmin/login/check')
    .get(User.check_login);    

  app.route('/api/usersAdmin/login/logout')
    .delete(User.logout_admin);

  app.route('/api/usersAdmin/:userId')
    .get(User.find_user)
    .put(User.update_user)
    .delete(User.delete_user);
};
'use strict';

var mongoose = require('mongoose'),
User = mongoose.model('User'),
Security = require('../security/security');

exports.list_users = function(req, res) {
    const login = Security.login_admin(req, res);

    if(login.auth) {
      var query = User.find({}, null, {sort: {'Created_Date': -1}});
      query.exec(function(err, user) {
          if (err)
              res.send(err);
          res.json(user);
      });
    }
};

exports.create_user = function(req, res) {
  const login = Security.login_admin(req, res);

  if(login.auth) {
    var userToAdd = new User(req.body);
    userToAdd.save(function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
  }
};

exports.find_user = function(req, res) {  
  const login = Security.login_admin(req, res);

  if(login.auth) {
    User.findById(req.params.userId, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
  }
};

exports.update_user = function(req, res) {
  const login = Security.login_admin(req, res);

  if(login.auth) {
    User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true, useFindAndModify: false}, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  }
};

exports.delete_user = function(req, res) {
  const login = Security.login_admin(req, res);

  if(login.auth) {
    User.remove({
      _id: req.params.userId
    }, function(err, user) {
      if (err)
        res.send(err);
      
      res.json({ message: 'User successfully deleted' });
    });
  }
};

exports.login_user = function(req, res) {
  var query = User.find({userLogin: req.body.userName, password: req.body.password}, null, {sort: {'Created_Date': -1}});
  query.exec(function(err, user) {
      if (err)
        res.status(500).send(err);
      else if(user.length === 0){
        res.status(401).send("User not find");
      }
      else {
        const options = {
          httpOnly: true,
          signed: true
        };

        const jwt = require('jsonwebtoken');
        const token = jwt.sign({ user: user[0].userLogin, auth: true }, process.env.API_KEY, { expiresIn: '2h' });

        res.cookie('token', token, options).status(200).send("success");
      }
  });
};

exports.check_login = function(req, res) {
  const login = Security.login_admin(req, res);
  if(login.auth){
    res.status(200).send(login);
  }
}


exports.logout_admin = function(req, res) {
  res.clearCookie('token').end();
}
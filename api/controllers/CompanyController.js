'use strict';

var mongoose = require('mongoose'),
path = require("path"),
multer = require("multer"),
Company = mongoose.model('Company'),
Security = require('../security/security');

exports.list_companies = function(req, res) {
    var query = Company.find({status: true}, null, {limit: parseInt(req.query.quantity), sort: {'order': 1}});
    query.exec(function(err, company) {
        if (err)
            res.send(err);
        res.json(company);
    });
};

exports.create_company = function(req, res) {
  const login = Security.login_admin(req, res);

  if(login.auth) {
    var companyToAdd = new Company(req.body);
    companyToAdd.save(function(err, company) {
      if (err)
          res.send(err);
      res.json(company);
    });
  }
};

exports.find_company = function(req, res) {
  Company.findById(req.params.companyId, function(err, company) {
    if (err)
        res.send(err);
    res.json(company);
  });
};

exports.update_company = function(req, res) {
  const login = Security.login_admin(req, res);

  if(login.auth) {
    Company.findOneAndUpdate({_id: req.params.companyId}, req.body, {new: true, useFindAndModify: false}, function(err, company) {
      if (err)
        res.send(err);
      res.json(company);
    });
  }
};

exports.delete_company = function(req, res) {
  const login = Security.login_admin(req, res);

  if(login.auth) {
    Company.remove({
      _id: req.params.companyId
    }, function(err, company) {
      if (err)
        res.send(err);
      res.json({ message: 'Company successfully deleted' });
    });
  }
};

exports.upload_picture = function(req, res) {
  const login = Security.login_admin(req, res);

  if(login.auth) {
    const storage = multer.diskStorage({
      destination: process.env.COMPANYIMAGEURL,
      filename: function(req, file, cb){
        cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
      }
    });

    const upload = multer({
      storage: storage
    }).single("image");

    upload(req, res, (err) => {
      if(err)
        res.send(err);
      else {
        res.json({ filename: req.file.filename });
      }
    });
  }
};
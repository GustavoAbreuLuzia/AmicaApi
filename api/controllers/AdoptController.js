'use strict';

var mongoose = require('mongoose'),
path = require("path"),
multer = require("multer"),
Pet = mongoose.model('Pets'),
Security = require('../security/security');

exports.list_pets = function(req, res) {
    var query = Pet.find({status: true}, null, {sort: {'Created_Date': -1}});
    query.exec(function(err, pet) {
        if (err)
            res.send(err);
        res.json(pet);
    });
};

exports.create_pet = function(req, res) {
  const login = Security.login_admin(req, res);

  if(login.auth) {
    var petToAdd = new Pet(req.body);
    petToAdd.save(function(err, pet) {
        if (err)
            res.send(err);
        res.json(pet);
    });
  }
};

exports.find_pet = function(req, res) {
    Pet.findById(req.params.petId, function(err, pet) {
        if (err)
            res.send(err);
        res.json(pet);
    });
};

exports.update_pet = function(req, res) {
  const login = Security.login_admin(req, res);

  if(login.auth) {
    Pet.findOneAndUpdate({_id: req.params.petId}, req.body, {new: true, useFindAndModify: false}, function(err, pet) {
      if (err)
        res.send(err);
      res.json(pet);
    });
  }
};

exports.delete_pet = function(req, res) {
  const login = Security.login_admin(req, res);

  if(login.auth) {
    Pet.remove({
      _id: req.params.petId
    }, function(err, pet) {
      if (err)
        res.send(err);
      res.json({ message: 'Pet successfully deleted' });
    });
  }
};

exports.upload_picture = function(req, res) {
  const login = Security.login_admin(req, res);

  if(login.auth) {
    const storage = multer.diskStorage({
      destination: process.env.ADOPTIMAGEURL,
      filename: function(req, file, cb){
        cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
      }
    });

    const upload = multer({
      storage: storage
    }).array("image");

    upload(req, res, (err) => {
      if(err)
        res.send(err);
      else {
        const filesName = req.files.map(file => file.filename);
        res.json({ filesName: filesName });
      }
    });
  }
};
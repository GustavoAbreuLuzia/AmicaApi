'use strict';

var mongoose = require('mongoose'),
Pet = mongoose.model('Pets');

exports.list_pets = function(req, res) {
    var query = Pet.find({}, null, {sort: {'Created_Date': -1}});
    query.exec(function(err, pet) {
        if (err)
            res.send(err);
        res.json(pet);
    });
};

exports.create_pet = function(req, res) {
    var petToAdd = new Pet(req.body);
    petToAdd.save(function(err, pet) {
        if (err)
            res.send(err);
        res.json(pet);
    });
};

exports.find_pet = function(req, res) {
    Pet.findById(req.params.petId, function(err, pet) {
        if (err)
            res.send(err);
        res.json(pet);
    });
};

exports.update_pet = function(req, res) {
  Pet.findOneAndUpdate({_id: req.params.petId}, req.body, {new: true, useFindAndModify: false}, function(err, pet) {
    if (err)
      res.send(err);
    res.json(pet);
  });
};

exports.delete_pet = function(req, res) {
  Pet.remove({
    _id: req.params.petId
  }, function(err, pet) {
    if (err)
      res.send(err);
    res.json({ message: 'Pet successfully deleted' });
  });
};
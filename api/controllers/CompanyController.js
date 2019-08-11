'use strict';

var mongoose = require('mongoose'),
Company = mongoose.model('Company');

exports.list_companies = function(req, res) {
    var query = Company.find({}, null, {limit: parseInt(req.query.quantity), sort: {'order': 1}});
    query.exec(function(err, company) {
        if (err)
            res.send(err);
        res.json(company);
    });
};

exports.create_company = function(req, res) {
    var companyToAdd = new Company(req.body);
    companyToAdd.save(function(err, company) {
        if (err)
            res.send(err);
        res.json(company);
    });
};

exports.find_company = function(req, res) {
  Company.findById(req.params.companyId, function(err, company) {
        if (err)
            res.send(err);
        res.json(company);
    });
};

exports.update_company = function(req, res) {
  Company.findOneAndUpdate({_id: req.params.companyId}, req.body, {new: true, useFindAndModify: false}, function(err, company) {
    if (err)
      res.send(err);
    res.json(company);
  });
};

exports.delete_company = function(req, res) {
  Company.remove({
    _id: req.params.companyId
  }, function(err, company) {
    if (err)
      res.send(err);
    res.json({ message: 'Company successfully deleted' });
  });
};
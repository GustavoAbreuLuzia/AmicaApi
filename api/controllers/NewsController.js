'use strict';

var mongoose = require('mongoose'),
News = mongoose.model('News');

exports.list_news = function(req, res) {
    var query = News.find({}, null, {limit: parseInt(req.query.quantity), sort: {'Created_Date': -1}});
    query.exec(function(err, news) {
        if (err)
            res.send(err);
        res.json(news);
    });
};

exports.create_news = function(req, res) {
    var newsToAdd = new News(req.body);
    newsToAdd.save(function(err, news) {
        if (err)
            res.send(err);
        res.json(news);
    });
};

exports.find_news = function(req, res) {
    News.findById(req.params.newsId, function(err, news) {
        if (err)
            res.send(err);
        res.json(news);
    });
};

exports.update_news = function(req, res) {
  News.findOneAndUpdate({_id: req.params.newsId}, req.body, {new: true, useFindAndModify: false}, function(err, news) {
    if (err)
      res.send(err);
    res.json(news);
  });
};

exports.delete_news = function(req, res) {
  News.remove({
    _id: req.params.newsId
  }, function(err, news) {
    if (err)
      res.send(err);
    res.json({ message: 'News successfully deleted' });
  });
};
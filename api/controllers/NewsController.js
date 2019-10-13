'use strict';

var mongoose = require('mongoose'),
path = require("path"),
multer = require("multer"),
News = mongoose.model('News'),
Security = require('../security/security');

exports.list_news = function(req, res) {
    var query = News.find({status: true}, null, {limit: parseInt(req.query.quantity), sort: {'Created_Date': -1}});
    query.exec(function(err, news) {
        if (err)
            res.send(err);
        res.json(news);
    });
};

exports.create_news = function(req, res) {
  const login = Security.login_admin(req, res);

  if(login.auth) {
    var newsToAdd = new News(req.body);
    newsToAdd.save(function(err, newsInserted) {
        if (err)
            res.send(err);
        res.json(newsInserted);
    });
  }
};

exports.find_news = function(req, res) {
    News.findById(req.params.newsId, function(err, news) {
        if (err)
            res.send(err);
        res.json(news);
    });
};

exports.update_news = function(req, res) {
  const login = Security.login_admin(req, res);

  if(login.auth) {
    News.findOneAndUpdate({_id: req.params.newsId}, req.body, {new: true, useFindAndModify: false}, function(err, news) {
      if (err)
        res.send(err);
      res.json(news);
    });
  }
};

exports.delete_news = function(req, res) {
  const login = Security.login_admin(req, res);

  if(login.auth) {
    News.remove({
      _id: req.params.newsId
    }, function(err, news) {
      if (err)
        res.send(err);
      res.json({ message: 'News successfully deleted' });
    });
  }
};

exports.upload_picture = function(req, res) {
  const login = Security.login_admin(req, res);

  if(login.auth) {
    const storage = multer.diskStorage({
      destination: process.env.NEWSIMAGEURL,
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


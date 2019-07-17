'use strict';
module.exports = function(app) {
  var News = require('../controllers/newsController');

  // news Routes
  app.route('/news')
    .get(News.list_news)
    .post(News.create_news);

  app.route('/news/:newsId')
    .get(News.find_news)
    .put(News.update_news)
    .delete(News.delete_news);
};
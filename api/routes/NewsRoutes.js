'use strict';
module.exports = function(app) {
  var News = require('../controllers/NewsController');

  // News Routes
  app.route('/api/news')
    .get(News.list_news)
    .post(News.create_news);

  app.route('/api/news/:newsId')
    .get(News.find_news)
    .put(News.update_news)
    .delete(News.delete_news);

  app.route('/api/news/admin/upload')
    .post(News.upload_picture);
};
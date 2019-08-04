var express = require('express'),
cors = require('cors'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
bodyParser = require('body-parser');

// Load model at mongoose
Pet = require('./api/models/AdoptModel');
News = require('./api/models/NewsModel');
Contact = require('./api/models/ContactModel');

// Mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb', { useNewUrlParser: true }); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Add routes from API
var routesPet = require('./api/routes/AdoptRoutes');
routesPet(app);

var routesNews = require('./api/routes/NewsRoutes');
routesNews(app); 

var routesContact = require('./api/routes/ContactRoutes');
routesContact(app);

// If not find any other route
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

// Listen to specified port
app.listen(port);

console.log('Amica API server started on: ' + port);
require('dotenv').config();

var express = require('express'),
cookieParser = require('cookie-parser'),
cors = require('cors'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
bodyParser = require('body-parser');

// Load model at mongoose
Pet = require('./api/models/AdoptModel');
News = require('./api/models/NewsModel');
Contact = require('./api/models/ContactModel');
Partner = require('./api/models/PartnerModel');
Company = require('./api/models/CompanyModel');
User = require('./api/models/UserModel');

// Mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb', { useNewUrlParser: true }); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIEKEY));

var corsOptions = {
  origin: process.env.URL,
  credentials: true
}
app.use(cors(corsOptions));

//Add routes from API
var routesPet = require('./api/routes/AdoptRoutes');
routesPet(app);

var routesNews = require('./api/routes/NewsRoutes');
routesNews(app); 

var routesContact = require('./api/routes/ContactRoutes');
routesContact(app);

var routesPartner = require('./api/routes/PartnerRoutes');
routesPartner(app);

var routesCompany = require('./api/routes/CompanyRoutes');
routesCompany(app);

var routesAdmin = require('./api/routes/UserRoutes');
routesAdmin(app);

app.use(express.static('client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// If not find any other route
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

// Listen to specified port
app.listen(port);

console.log('Amica API server started on: ' + port);
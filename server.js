require('dotenv').config();

var express = require('express'),
cookieParser = require('cookie-parser'),
cors = require('cors'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
path = require('path'),
https = require('https'),
fs = require('fs'),
pathClient = process.env.PATHCLIENT;

const options = {
  cert: fs.readFileSync('./sslcert/associacaoamica.org.crt'),
  key: fs.readFileSync('./sslcert/associacaoamica.org_5ebdd5e21a865.key'),
  ca: fs.readFileSync('./sslcert/intermediate-ca.crt')
};;

// Load model at mongoose
Pet = require('./api/models/AdoptModel');
News = require('./api/models/NewsModel');
Contact = require('./api/models/ContactModel');
Partner = require('./api/models/PartnerModel');
Company = require('./api/models/CompanyModel');
User = require('./api/models/UserModel');

// Mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb', { useNewUrlParser: true, useUnifiedTopology: true }); 

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

app.use(express.static(path.join(__dirname, pathClient)));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// If not find any other route
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

// Listen to specified port
https.createServer(options, app).listen(port);

console.log('Amica API server started on: ' + port);
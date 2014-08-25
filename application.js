var mbaasApi = require('fh-mbaas-api');
var express = require('express');
var mbaasExpress = mbaasApi.mbaasExpress();
var cors = require('cors');

// Securable endpoints: list the endpoints which you want to make securable here
var securableEndpoints = [];

var app = express();

// Enable CORS for all requests
app.use(cors());

// Note: the order which we add middleware to Express here is important!
app.use('/sys', express.sys(securableEndpoints));
app.use('/mbaas', express.mbaas);

// Note: important that this is added just before your own Routes
app.use(express.fhmiddleware());

app.use('/recordTest', require('./lib/recordTest.js')());

// You can define custom URL handlers here, like this one:
app.use('/', function(req, res) {
  res.end('Your Cloud App is Running');
});

// Important that this is last!
app.use(express.errorHandler());

var port = process.env.FH_PORT || process.env.VCAP_APP_PORT || 8001;
var server = app.listen(port, function() {
  console.log("App started at: " + new Date() + " on port: " + port);
});
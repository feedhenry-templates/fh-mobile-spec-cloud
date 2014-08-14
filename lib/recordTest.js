var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

function recordTestRoute() {
  var recordTest = new express.Router();
  recordTest.use(cors());
  recordTest.use(bodyParser());

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  recordTest.post('/', function(req, res) {
    console.log('Got request', req.body);
    res.json({});
  });

  return recordTest;
}

module.exports = recordTestRoute;
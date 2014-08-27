var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fhapi = require('fh-mbaas-api');
var DB_TYPE = 'testResults';
var async = require('async');


function worker(task, callback){
  var data = task.data;
  var reporterId = data.reporterId;
  var existing = null;
  var action = 'create';
  fhapi.db({
    act: 'list',
    type: DB_TYPE,
    eq:{
      'reporterId': reporterId
    }
  }, function(error, found){
    if(error){
      console.error('Error when list data', error);
      return callback(error);
    } else {
      var guid = null;
      if(found.count > 0){
        existing = found.list[0].fields;
        guid = found.list[0].guid;
        action = 'update';
      } else {
        existing = {
          deviceInfo: data.deviceInfo,
          reporterId: reporterId,
          testInfo: []
        };
      }

      existing.testInfo = existing.testInfo.concat(data.testInfo);

      var updateOption = {
        act: action,
        type: DB_TYPE,
        fields: existing
      }
      
      if(guid){
        updateOption.guid = guid;
      }

      fhapi.db(updateOption, function(err){
        if(err){
          console.error('Error when update data', err);
          return callback(err);
        } else {
          return callback();
        }
      });
    }
  });
}

var queue = async.queue(worker, 1);

function recordTestRoute() {
  var recordTest = new express.Router();
  recordTest.use(cors());
  recordTest.use(bodyParser());

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  recordTest.post('/', function(req, res) {
    var data = req.body;
    //sometimes the second request could be sent in before the first finished, so queue them to ensure order
    queue.push({data: data});
    res.json({});
  });

  return recordTest;
}

module.exports = recordTestRoute;
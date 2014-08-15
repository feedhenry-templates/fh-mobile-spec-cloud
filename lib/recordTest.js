var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fhapi = require('fh-mbaas-api');
var DB_TYPE = 'testResults';
var _ = require('lodash');

function recordTestRoute() {
  var recordTest = new express.Router();
  recordTest.use(cors());
  recordTest.use(bodyParser());

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  recordTest.post('/', function(req, res) {
    var data = req.body;
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
        return res.send(500, error);
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

        fhapi.db(updateOption, function(err, updateResult){
          if(err){
            return res.send(500, err);
          } else {
            res.json({});
          }
        });
      }
    });
  });

  recordTest.get('/', function(req, res){
    fhapi.db({
      act: 'list',
      type: DB_TYPE
    }, function(error, entries){
      if(error){
        return res.send(500, error);
      } else {
        var ret = [];
        ret = _.map(entries.list, function(entry){
          var fields = entry.fields;
          fields.guid = entry.guid;
          return fields;
        });
        return res.json(ret);
      }
    });
  });

  return recordTest;
}

module.exports = recordTestRoute;
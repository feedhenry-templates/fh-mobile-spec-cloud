var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fhapi = require('fh-mbaas-api');
var DB_TYPE = 'testResults';
var _ = require('lodash');

function listTestsRoute(){
  var listTests = new express.Router();
  listTests.use(cors());
  listTests.use(bodyParser());

  listTests.get('/', function(req, res){
    fhapi.db({
      act: 'list',
      type: DB_TYPE
    }, function(error, entries){
      if(error){
        return res.send(500, error);
      } else {
        var list = _.filter(entries.list, function(entry){
          if(entry.fields.testInfo){
            if(_.find(entry.fields.testInfo, {stage: 'runner_starting'})){
              return true;
            }
          }
          return false;
        });
        var ret = [];
        ret = _.map(list, function(entry){
          var fields = entry.fields;
          fields.guid = entry.guid;
          return fields;
        });
        ret = _.sortBy(ret, 'order');
        return res.json(ret);
      }
    });
  });

  return listTests;
}

module.exports = listTestsRoute;
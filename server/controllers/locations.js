'use strict';

var Location = require('../models/location');

exports.index = function(req, res){
  Location.all(function(err, locations){
    res.send({locations:locations});
  });
};

exports.show = function(req, res){
  Location.findById(req.params.locationId, function(err, loc){
    loc.findEvents(function(err, occasions){
      res.send({loc:loc, occasions:occasions});
    });
  });
};

exports.favorite = function(req, res){
  console.log(req.body);
};



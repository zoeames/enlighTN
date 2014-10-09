'use strict';

var Location = require('../models/location');

exports.index = function(req, res){
  Location.all(function(err, locations){
    res.send({locations:locations});
  });
};

exports.show = function(req, res){
  Location.retrieve(req.session.userId, req.params.locationId, function(err, loc, fav){
    loc.findEvents(function(err, occasions){
      console.log(fav);
      res.send({loc:loc, occasions:occasions, fav:fav});
    });
  });
};

exports.favorite = function(req, res){
  Location.favorite(req.session.userId, req.params.locationId, function(err, loc, fav){
    res.send({loc:loc, fav:fav});
  });
};



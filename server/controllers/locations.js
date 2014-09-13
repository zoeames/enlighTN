'use strict';

var Location = require('../models/location');

exports.index = function(req, res){
  Location.all(function(err, locations){
    res.send({locations:locations});
  });
};


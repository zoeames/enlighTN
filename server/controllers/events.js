'use strict';

var Occasion = require('../models/event');

exports.index = function(req, res){
  Occasion.all(function(err, occasions){
    res.send({occasions:occasions});
  });
};

exports.show = function(req, res){
  Occasion.findById(req.params.eventId, function(err, occasion){
    res.send({occasion:occasion});
  });
};

exports.rsvp = function(req, res){
  console.log(req.body);
};

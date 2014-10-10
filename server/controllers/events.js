'use strict';

var Occasion = require('../models/event');

exports.index = function(req, res){
  Occasion.all(function(err, occasions){
    res.send({occasions:occasions});
  });
};

exports.show = function(req, res){
  Occasion.retrieve(req.session.userId, req.params.eventId, function(err, occasion, rsvp){
    res.send({occasion:occasion, rsvp:rsvp});
  });
};

exports.rsvp = function(req, res){
  Occasion.rsvp(req.session.userId, req.params.eventId, function(err, rsvp){
    res.send({rsvp:rsvp});
  });
};

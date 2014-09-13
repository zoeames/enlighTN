'use strict';

var Occasion = require('../models/event');

exports.index = function(req, res){
  Occasion.all(function(err, events){
    res.send({events:events});
  });
};

exports.show = function(req, res){
  Occasion.findById(req.params.eventId, function(err, event){
    res.send({event:event});
  });
};

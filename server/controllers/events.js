'use strict';

var Occasion = require('../models/event');

exports.index = function(req, res){
  Occasion.all(function(err, events){
    res.send({events:events});
  });
};


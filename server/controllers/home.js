'use strict';

//var Occasion = require('../models/event');

exports.index = function(req, res){
  var list = ['Music', 'Art', 'Craft', 'Drama', 'Poetic', 'Culture', 'Musical', 'Theatre', 'Historic'];
  res.send({creativeList:list});
};


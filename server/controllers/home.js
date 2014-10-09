'use strict';

//var Occasion = require('../models/event');

exports.index = function(req, res){
  //when more time...limit events sent by next 7 days
  var list = ['Music', 'Art', 'Craft', 'Drama', 'Poetic', 'Culture', 'Musical', 'Theatre', 'Historic'];
  //Occasion.findUpcoming(function(err, occasions){
    //res.send({creativeList:list, occasions:occasions});
  //});
  res.send({creativeList:list});
};


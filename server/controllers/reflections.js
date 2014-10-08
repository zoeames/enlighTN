'use strict';

var Reflection = require('../models/reflection');

exports.create = function(req, res){
  console.log(req.body);
  Reflection.create(req.body, req.user, function(err, reflection){
  });
};

exports.update = function(req, res){
  console.log(req.body);
};
exports.upvote = function(req, res){
  console.log(req.body);
};

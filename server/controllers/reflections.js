'use strict';

var Reflection = require('../models/reflection');

exports.create = function(req, res){
  Reflection.save(req.session.userId, req.body, function(){
    res.status(200).end();
  });
};

exports.update = function(req, res){
  console.log(req.body);
};

exports.vote = function(req, res){
  console.log(req.body);
};

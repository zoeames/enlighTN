'use strict';

var Reflection = require('../models/reflection');

exports.create = function(req, res){
  Reflection.save(req.session.userId, req.body, function(){
    res.status(200).end();
  });
};

exports.update = function(req, res){
  Reflection.update(req.body, function(){
    res.status(200).end();
  });
};

exports.vote = function(req, res){
  Reflection.vote(req.session.userId, req.params.reflectId, function(){
    res.status(200).end();
  });
};

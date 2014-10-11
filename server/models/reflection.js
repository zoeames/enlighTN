'use strict';

var Mongo = require('mongodb');

function Reflection(id, o){
  this.authorId   = Mongo.ObjectID(id);
  this.title      = o.title;
  this.text       = o.text;
  this.locationId = Mongo.ObjectID(o.locId);
  this.date       = new Date();
  this.upvote     = o.upvote || [];
}

Object.defineProperty(Reflection, 'collection', {
  get: function(){return global.mongodb.collection('reflections');}
});

Reflection.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Reflection.collection.findOne({_id:_id}, cb);
};

Reflection.save = function(userId, obj, cb){
  var r = new Reflection(userId, obj);
  Reflection.collection.save(r, cb);
};

Reflection.findAllByLocationId = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Reflection.collection.find({locationId:_id}).toArray(cb);
};

module.exports = Reflection;

'use strict';

var Mongo = require('mongodb');

function Reflection(o){
  this.userId = Mongo.ObjectID(o.userId);
  this.upvoteIds = [];
  this.locationId = Mongo.ObjectId(o.locationId);
  this.body = o.body;
}

Object.defineProperty(Reflection, 'collection', {
  get: function(){return global.mongodb.collection('reflections');}
});

Reflection.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Reflection.collection.findOne({_id:_id}, cb);
};

Reflection.create = function(o, id, cb){
  var r = new Reflection(o, id);
  Reflection.collection.save(r, cb);
};

Reflection.findAllByLocationId = function(locationId, cb){
  Reflection.collection.find({locationId:locationId}).toArray(cb);
};
Reflection.prototype.update = function(o, cb){
  this.text = o.text;
  this.date   = new Date();

  Reflection.collection.save(this, cb);
};

module.exports = Reflection;

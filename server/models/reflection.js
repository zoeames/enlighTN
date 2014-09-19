'use strict';

var Mongo = require('mongodb');

function Reflection(o){
  if(o._id){this._id = o._id;}
  this.authorId = Mongo.ObjectID(o.authorId);
  this.text = o.text;
  this.locationId = Mongo.ObjectID(o.locationId);
  this.date = new Date(o.date);
  this.upvote = [];
}

Object.defineProperty(Reflection, 'collection', {
  get: function(){return global.mongodb.collection('reflections');}
});

Reflection.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Reflection.collection.findOne({_id:_id}, cb);
};

Reflection.save = function(o, cb){
  var r = new Reflection(o);
  Reflection.collection.save(r, cb);
};

Reflection.findAllByLocationId = function(locationId, cb){
  Reflection.collection.find({locationId:locationId}).toArray(cb);
};

module.exports = Reflection;

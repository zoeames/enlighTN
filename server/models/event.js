'use strict';

var Mongo = require('mongodb');

function Event(o){
  this.name       = o.name;
  this.locationId = Mongo.ObjectID(o.locationId);
  this.type       = o.type;
  this.attendees  = [];
  this.date       = new Date(o.date);
}

Object.defineProperty(Event, 'collection', {
  get: function(){return global.mongodb.collection('events');}
});

Event.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Event.collection.findOne({_id:_id}, cb);
};

Event.all = function(cb){
  Event.collection.find().toArray(cb);
};

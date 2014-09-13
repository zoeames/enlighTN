'use strict';

var Mongo = require('mongodb');

function Occasion(o){
  this.name       = o.name;
  this.locationId = Mongo.ObjectID(o.locationId);
  this.type       = o.type;
  this.attendees  = [];
  this.date       = new Date(o.date);
}

Object.defineProperty(Occasion, 'collection', {
  get: function(){return global.mongodb.collection('events');}
});

Occasion.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Occasion.collection.findOne({_id:_id}, cb);
};

Occasion.all = function(cb){
  Occasion.collection.find().toArray(cb);
};

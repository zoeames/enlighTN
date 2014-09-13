'use strict';

var Mongo = require('mongodb');

function Location(){
}

Object.defineProperty(Location, 'collection', {
  get: function(){return global.mongodb.collection('locations');}
});

Location.all = function(cb){
  Location.collection.find().toArray(cb);
};

Location.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Location.collection.findOne({_id:_id}, cb);
      // need to async map to include getEvents, getReflections
};



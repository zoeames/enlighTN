'use strict';

var Mongo      = require('mongodb'),
    Occasion   = require('./event'),
    Reflection = require('./reflection'),
    underscore = require('underscore');

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
  Location.collection.findOne({_id:_id}, function(err, obj){
    var loc = Object.create(Location.prototype);
    loc = underscore.extend(loc, obj);
    cb(err, loc);
  });
};

Location.prototype.findEvents = function(cb){
  Occasion.collection.find({locationId:this._id}).toArray(cb);
};

Location.prototype.findReflections = function(cb){
  Reflection.collection.find({locationId:this._id}).toArray(cb);
};

module.exports = Location;


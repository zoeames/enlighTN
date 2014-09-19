'use strict';

var Mongo = require('mongodb'),
    async = require('async'),
    User  = require('./user');

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
  Occasion.collection.findOne({_id:_id}, function(err, occasion){
    async.map(occasion.attendees, iterator, function(err, attendees){
      occasion.attendees = attendees;
      cb(null, occasion);
    });
  });
};

Occasion.all = function(cb){
  Occasion.collection.find().toArray(cb);
};

module.exports = Occasion;

//HELPER FUNCTIONS

function iterator(attendee, cb){
  User.findById(attendee, function(err, user){
    cb(null, user);
  });
}

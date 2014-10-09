'use strict';

var Mongo = require('mongodb'),
    async = require('async'),
    User  = require('./user'),
    underscore = require('underscore');

function Occasion(o){
 /* this.name       = o.name;
  this.locationId = Mongo.ObjectID(o.locationId);
  this.type       = o.type;
  this.attendees  = [];
  this.date       = new Date(o.date);*/
}

Object.defineProperty(Occasion, 'collection', {
  get: function(){return global.mongodb.collection('events');}
});

Occasion.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Occasion.collection.findOne({_id:_id}, cb);
};

Occasion.retrieve = function(userId, eventId, cb){
  Occasion.findById(eventId, function(err, occasion){
    var rsvp = RSVP(occasion.attendees, userId);
    occasion.attendees = occasion.attendees || [];
    async.map(occasion.attendees, iterator.bind(userId), function(err, attendees){
      occasion.attendees = attendees;
      cb(null, occasion, rsvp);
    });
  });
};

Occasion.all = function(cb){
  Occasion.collection.find().toArray(cb);
};

Occasion.rsvp = function(userId, eventId, cb){
  Occasion.findById(eventId, function(err, occasion){
    var rsvp = RSVP(occasion.attendees, userId);

    if(rsvp === true){
      occasion.attendees = underscore.without(occasion.attendees, userId);
    }else{
      occasion.attendees.push(userId);
    }
    Occasion.collection.save(occasion, function(){
      User.rsvp(userId, eventId, function(){
        cb(null, !rsvp);
      });
    });
  });
};


module.exports = Occasion;

//HELPER FUNCTIONS

function iterator(attendee, cb){
  if(attendee.toString() === this.toString()){cb(); return;}
  User.findById(attendee, function(err, user){
    var info = {
      _id  : user._id,
      name : user.name
    };

    cb(null, info);
  });
}

function RSVP(array, userId){
  if(!underscore.find(array, function(id){
    return id === userId;
  })){
    return false;
  }else{
    return true;
  }
}

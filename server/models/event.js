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
  console.log(id);
  var _id = Mongo.ObjectID(id);
  Occasion.collection.findOne({_id:_id}, function(err, occasion){
    occasion.attendees=occasion.attendees || [];
    async.map(occasion.attendees, iterator, function(err, attendees){
      occasion.attendees = attendees;
      console.log('Model:',occasion);
      cb(null, occasion);
    });
  });
};

Occasion.all = function(cb){
  Occasion.collection.find().toArray(cb);
};

Occasion.retrieve = function(userId, eventId, cb){
  Occasion.findById(eventId, function(err, occasion){
    var rsvp = RSVP(occasion.attendees, userId);
    cb(err, occasion, rsvp);
  });
};

Occasion.rsvp = function(userId, eventId, cb){
  Occasion.findById(eventId, function(err, occasion){
    occasion.attendees=occasion.attendees.map(unIterator);
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
  User.findById(attendee, function(err, user){
    cb(null, user);
  });
}

function unIterator(attendee){
  return attendee._id.toString();
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

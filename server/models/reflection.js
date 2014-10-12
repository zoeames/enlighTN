'use strict';

var Mongo      = require('mongodb'),
    underscore = require('underscore');

function Reflection(id, o){
  this.authorId   = Mongo.ObjectID(id);
  this.title      = o.title;
  this.text       = o.text;
  this.locationId = Mongo.ObjectID(o.locId);
  this.Date       = new Date();
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

Reflection.update = function(o, cb){
  var _id  = Mongo.ObjectID(o._id),
      date = new Date(o.date);

  Reflection.collection.findAndModify({_id:_id}, {}, {$set: {title: o.title, text: o.text, Date: date}}, function(a, b, c){
    cb();
  });
};

Reflection.findAllByUserId = function(authorId, cb){
  authorId = Mongo.ObjectID(authorId);

  Reflection.collection.find({authorId:authorId}).toArray(cb);
};

Reflection.findAllByLocationId = function(userId, locId, cb){
  var _id = Mongo.ObjectID(locId);

  Reflection.collection.find({locationId:_id}).toArray(function(err, reflects){
    reflects.forEach(isVote.bind(userId));
    cb(null, reflects);
  });
};

Reflection.vote = function(userId, reflectId, cb){
  Reflection.findById(reflectId, function(err, reflect){
    isVote = isVote.bind(userId);
    reflect = isVote(reflect);

    if(reflect.vote === true){
      reflect.upvote = underscore.without(reflect.upvote, userId);
    }else{
      reflect.upvote.push(userId);
    }

    Reflection.collection.save(reflect, cb);
  });
};

module.exports = Reflection;

//private helper function
function isVote(reflect){
  console.log(this);
  if(!underscore.find(reflect.upvote, function(id){
    return id.toString() === this.toString();
  }.bind(this))){
    reflect.vote = false;
  }else{
    reflect.vote = true;
  }
  return reflect;
}

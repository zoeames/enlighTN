'use strict';

var Mongo      = require('mongodb'),
    Occasion   = require('./event'),
    User       = require('./user'),
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

Location.mapFav = function(array, cb){
  cb(null, array);
};

Location.retrieve = function(userId, locId, cb){
  Location.findById(locId, function(err, loc){
    var fav = isFav(loc.favorites, userId);
    cb(err, loc, fav);
  });
};

Location.favorite = function(userId, locId, cb){
  Location.findById(locId, function(err, loc){
    var fav = isFav(loc.favorites, userId);

    if(fav === true){
      loc.favorites = underscore.without(loc.favorites, userId);
    }else{
      loc.favorites.push(userId);
    }

    Location.collection.save(loc, function(){
      User.favoriteLoc(userId, locId, function(){
        cb(null, loc, !fav);
      });
    });
  });
};

Location.prototype.findEvents = function(cb){
  Occasion.collection.find({locationId:this._id}).toArray(cb);
};

Location.prototype.findReflections = function(cb){
  Reflection.collection.find({locationId:this._id}).toArray(cb);
};

module.exports = Location;

//helper function
function isFav(array, userId){
  if(!underscore.find(array, function(id){
    return id === userId;
  })){
    return false;
  }else{
    return true;
  }
}

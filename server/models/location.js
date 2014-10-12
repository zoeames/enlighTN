'use strict';

var Mongo      = require('mongodb'),
    Occasion   = require('./event'),
    User       = require('./user'),
    Reflection = require('./reflection'),
    underscore = require('underscore'),
    async      = require('async');

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
  async.map(array, convertLocs, function(err, array){
    cb(null, array);
  });
};

Location.mapLoc = function(array, cb){
  async.map(array, convertLoc, function(err, array){
    cb(null, array);
  });
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
function convertLocs(id, cb){
  var Location = require('./location');

  Location.findById(id, function(err, loc){
    loc = {
      _id:   loc._id,
      title: loc.title
    };

    cb(null, loc);
  });
}

function convertLoc(obj, cb){
  var Location = require('./location');

  Location.findById(obj.locationId, function(err, loc){
    obj.loc = loc.title;

    cb(null, obj);
  });
}

function isFav(array, userId){
  if(!underscore.find(array, function(id){
    return id === userId;
  })){
    return false;
  }else{
    return true;
  }
}

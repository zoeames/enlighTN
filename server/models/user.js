'use strict';

var bcrypt = require('bcrypt'),
    Mongo  = require('mongodb');

function User(o){
  if(o._id){this._id = o._id;}
  this.email = o.email;
  this.name = o.name;
  this.password = o.password;
  this.favoriteLocations = [];
  this.RSVP = [];
  this.upVote = [];
}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  User.collection.findOne({_id:_id}, cb);
};

User.register = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(user || o.password.length < 3){return cb();}
    o.password = bcrypt.hashSync(o.password, 10);
    User.collection.save(o, cb);
  });
};

User.login = function(o, cb){
  User.collection.findOne({username:o.username}, function(err, user){
    if(!user){return cb();}
    var isOk = bcrypt.compareSync(o.password, user.password);
    if(!isOk){return cb();}
    cb(null, user);
  });
};

User.save = function(o, cb){
  console.log('Model:', o);
  User.collection.save(o, cb);
};

module.exports = User;

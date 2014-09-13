'use strict';

//var bcrypt = require('bcrypt'),
var Mongo  = require('mongodb');

function User(){
}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  User.collection.findOne({_id:_id}, cb);
};
/*
User.register = function(o, cb){
  User.collection.findOne({username:o.username}, function(err, user){
    if(user){return cb();}
    o.password = bcrypt.hashSync(o.password, 10);
    User.collection.save(o, cb);
  });
};

User.authenticate = function(o, cb){
  User.collection.findOne({username:o.username}, function(err, user){
    if(!user){return cb();}
    var isOk = bcrypt.compareSync(password, user.password);
    if(!isOk){return cb();}
    cb(null, user);
  });
};
*/
User.prototype.update = function(o, cb){
  this.username = o.username;
  this.phone   = o.phone;
  this.zip = o.zip;

  User.collection.save(this, cb);
};

module.exports = User;

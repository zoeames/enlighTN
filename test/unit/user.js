'use strict';

var expect    = require('chai').expect,
    User      = require('../../server/models/user'),
    dbConnect = require('../../server/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'enlighTN-test',
    zoe;

describe('User', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    var z = {
      '_id' : '000000000000000000000003',
      'name' : 'Zoe',
      'email' : 'zoe@aol.com',
      'password' : '1234',
      'favoriteLocations':['e00000000000000000000002', 'c0000000000000000000007', 'a00000000000000000000001'],
      'RSVP':['eee000000000000000000001', 'eee000000000000000000002'],
      'upVote' : ['aa0000000000000000000002', 'aa0000000000000000000004']
    };
    zoe = new User(z);

    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new User object', function(){
      var o = {
        username : 'sue',
        password : 'abcd',
        },
      u = new User(o);
      expect(u).to.be.instanceof(User);
    });
  });

  describe('.save', function(){
    it('should save a user', function(done){
      var id = '000000000000000000000002';
      User.findById(id, function(user){
        console.log('test', user);
        user.email='zoea@aol.com';
        console.log('test', user);

        User.save(user, function(err, sobj){
          expect(user._id).to.be.instanceof(Mongo.ObjectID);
            done();
        });
      });
    });
  });
});

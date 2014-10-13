'use strict';

var expect    = require('chai').expect,
    User      = require('../../server/models/user'),
    dbConnect = require('../../server/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'enlighTN-test';

describe('User', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
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
      User.findById(id, function(err, user){
        console.log('test1', user);
        user.email='zoea@aol.com';
        console.log('test2', user);

        User.save(user, function(err, sobj){
          expect(user._id).to.be.instanceof(Mongo.ObjectID);
            done();
        });
      });
    });
  });
  describe('.update', function(){
    it('should update a user profile', function(done){
      var id = '000000000000000000000001',
          o = {name: 'Robert Smith', email: 'bobsmith@aol.com'};
      User.update(id, o, function(err, user, blah){
        console.log(user);
        console.log(blah);
        done();
      });
    });
  });
  describe('.getUserData', function(){
    it('should get user data', function(done){
      User.getUserData('000000000000000000000001', function(err, user){
        expect(user.name).to.include('Bob Smith');
        done();
      });
    });
  });
  describe('.favoriteLoc', function(){
    it('should favorite a location for a user', function(done){
      User.favoriteLoc('000000000000000000000001', 'a00000000000000000000074', function(err, user, blah){
        expect(user).to.equal(1);
        done();
      });
    });
  });
});

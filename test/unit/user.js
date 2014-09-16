'use strict';

var expect    = require('chai').expect,
    User      = require('../../server/models/user'),
    dbConnect = require('../../server/lib/mongodb'),
    cp        = require('child_process'),
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
        zip : '37215',
        phone : '+15005550006',
        },
      u = new User(o);
      expect(u).to.be.instanceof(User);
    });
  });

  /*describe('#update', function(){
    it('should update an item', function(done){
      User.findById('000000000000000000000002', function(user){
        user.update(user, function(){
          expect(user.zip).to.equal('37215');
          expect(user.phone).to.equal('+15005550006');
          done();
        });
      });
    });
  });*/
});

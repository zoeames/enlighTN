'use strict';

var expect    = require('chai').expect,
    User      = require('../../app/models/user'),
    dbConnect = require('../../app/lib/mongodb'),
    //cp        = require('child_process'),
    db        = 'enlighTN-test';

describe('Location', function(){
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
      expect(r).to.be.instanceof(Reflection);
    });
  });

  describe('#update', function(){
    it('should update an item', function(done){
      Location.findById('a0000000000000000000002', function(location){
          expect(location.title).to.include('');
          done();
        });
      });
    });
  });
});

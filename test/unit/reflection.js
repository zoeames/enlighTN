'use strict';

var expect    = require('chai').expect,
    User      = require('../../server/models/reflection'),
    dbConnect = require('../../server/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'enlighTN-test';

describe('Reflection', function(){
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

  /*describe('constructor', function(){
    it('should create a new User object', function(){
      var o = {
        authorId :'000000000000000000000002',
        locationId :'a00000000000000000000001',
        text : 'It is amazing and i love it.',
        date : {"$date":1409184000000},
        }
      r = new Reflection(o);
      expect(r).to.be.instanceof(Reflection);
    });
  });

  describe('#update', function(){
    it('should update an item', function(done){
      Reflection.findById('aa0000000000000000000002', function(reflection){
        reflection.update(reflection, function(){
          expect(reflection.text).to.include('amazing');
          done();
        });
      });
    });
  });*/
});

'use strict';

var expect    = require('chai').expect,
    Location  = require('../../server/models/location'),
    Reflection = require('../../server/models/reflection'),
    dbConnect = require('../../server/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
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
    it('should create a new Location object', function(){
      var l = new Location();
      expect(l).to.be.instanceof(Location);
    });
  });

  describe('#findEvents', function(){
    it('should find all events', function(done){
      Location.findById('e00000000000000000000001', function(err, loc){
        loc.findEvents(function(err, events){
          expect(events.length).to.equal(8);
          done();
        });
      });
    });
  });
  describe('#findReflections', function(){
    it('should find all reflections', function(done){
      Location.findById('e00000000000000000000001', function(err, loc){
        loc.findReflections(function(err, reflections){
          expect(reflections.length).to.equal(6);
          done();
        });
      });
    });
  });

  describe('.all', function(){
    it('should find all locations', function(done){
      Location.all(function(err, locations){
        expect(locations).to.have.length(342);
        done();
      });
    });
  })
//Last braces
});

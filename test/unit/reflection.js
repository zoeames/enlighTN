'use strict';

var expect    = require('chai').expect,
    Reflection = require('../../server/models/reflection'),
    dbConnect = require('../../server/lib/mongodb'),
    Mongo     = require('mongodb'),
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

  describe('constructor', function(){
    it('should create a new reflection object', function(){
      var o = {
        authorId :'000000000000000000000002',
        locationId :'a00000000000000000000001',
        text : 'It is amazing and i love it.',
        date : {"$date":1409184000000}
        },
          r = new Reflection(o);
      expect(r).to.be.instanceof(Reflection);
    });
  });

  describe('.save', function(){
    it('should create a reflection', function(done){
      var s = {
        "authorId" : "000000000000000000000002", "locationId" : "e00000000000000000000001",
        "text" : "Cookie",
        };

      Reflection.save(s, function(err, sobj){
        expect(sobj._id).to.be.instanceof(Mongo.ObjectID);
          done();
      });
    });
  });
  describe('.findById', function(){
    it('should find a reflection by id', function(done){
      var _id = Mongo.ObjectID('aa0000000000000000000002');
      Reflection.findById(_id, function(err, refl){
        expect(refl.title).to.include('loved');
        done();
      });
    });
  });
  describe('.findAllByLocationId', function(){
    it('should find all reflections for a location', function(done){
      var locationId = Mongo.ObjectID('e00000000000000000000001');
      Reflection.findAllByLocationId(locationId, function(err, reflections){
        console.log(reflections);
        expect(reflections).to.have.length(6);
        done();
      });
    });
  });
// Last braces
});

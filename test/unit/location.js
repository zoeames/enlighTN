/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Location  = require('../../server/models/location'),
    dbConnect = require('../../server/lib/mongodb'),
    cp        = require('child_process'),
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

  describe('.all', function(){
    it('should get all stops', function(done){
      Location.all(function(err, locs){
        console.log(locs.length);
        //expect(locs).to.have.length(2);
        done();
      });
    });
  });
});

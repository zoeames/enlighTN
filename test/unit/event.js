/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Occasion  = require('../../server/models/event'),
    dbConnect = require('../../server/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'enlighTN-test';

describe('Event', function(){
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
    it('should create a new Event object', function(){
      var e = new Occasion({name: 'party'});
      expect(e).to.be.instanceof(Occasion);
    });
  });

  describe('.all', function(){
    it('should get all events', function(done){
      Occasion.all(function(err, events){
        expect(events).to.have.length(8);
        done();
      });
    });
  });
  describe('.findById', function(){
    it('should find an event by id', function(done){
      var id = 'eee000000000000000000001';
      Occasion.findById(id, function(err, occ){
        console.log('Test', occ);
        expect(occ.name).to.include('Midsummer');
        expect(occ.attendees).to.have.length(2);
        done();
      });
    });
  });
  describe('.rsvp', function(){
    it('should allow a user to rsvp to an event', function(done){
      Occasion.rsvp('000000000000000000000001', 'eee000000000000000000003', function(err, obj){
        expect(obj).to.be.true;
        done();
      });
    });
    it('should not allow a user to rsvp to an event if already rsvped', function(done){
      Occasion.rsvp('000000000000000000000001', 'eee000000000000000000001', function(err, obj){
        expect(obj).to.be.false;
        done();
      });
    });
  });
//Last braces
});

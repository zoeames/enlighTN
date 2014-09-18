/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Event     = require('../../server/models/event'),
    dbConnect = require('../../server/lib/mongodb'),
    cp        = require('child_process'),
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
      //var e = new Event();
      //expect(e).to.be.instanceof(Event);
    });
  });

  describe('.all', function(){
    it('should get all events', function(done){
      Event.all(function(err, events){
        //expect(events).to.have.length(2);
        done();
      });
    });
  });
});

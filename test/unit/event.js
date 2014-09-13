'use strict';

var expect    = require('chai').expect,
    User      = require('../../app/models/user'),
    dbConnect = require('../../app/lib/mongodb'),
    //cp        = require('child_process'),
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
      var o = {
        name :'000000000000000000000002',
        locationId :'a00000000000000000000001',
        type : 'It is amazing and i love it.',
        date : {"$date":1409184000000},
        attendees : [],
        }
      },
      e = new Occasion(o);
      expect(e).to.be.instanceof(Occasion);
    });
  });

  describe('#update', function(){
    it('should update an item', function(done){
      Event.findById('e00000000000000000000002', function(occasion){
        ocassion.update(ocassion, function(){
          expect(ocassion.type).to.include('');
          done();
        });
      });
    });
  });
});

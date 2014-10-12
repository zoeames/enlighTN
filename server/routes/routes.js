'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    debug          = require('../lib/debug'),
    security       = require('../lib/security'),
    home           = require('../controllers/home'),
    users          = require('../controllers/users'),
    events         = require('../controllers/events'),
    locations      = require('../controllers/locations'),
    reflections    = require('../controllers/reflections');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../../public'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), secret:'my super secret key', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));

  app.use(security.authenticate);
  app.use(debug.info);

  app.get('/home', home.index);
  app.post('/register', users.register);
  app.post('/login', users.login);
  app.get('/dashboard', users.show);
  app.put('/dashboard/profile', users.update);
  app.put('/dashboard/reflect', reflections.update);

  app.use(security.bounce);
  app.delete('/logout', users.logout);
  app.post('/locations/:locationId/favorite', locations.favorite);
  app.post('/locations/:locationId/reflect/:reflectId', reflections.vote);
  app.post('/reflect', reflections.create);
  app.get('/locations/:locationId', locations.show);
  app.get('/locations', locations.index);
  app.post('/events/:eventId/rsvp', events.rsvp);
  app.get('/events', events.index);
  app.get('/events/:eventId', events.show);


  console.log('Express: Routes Loaded');
};


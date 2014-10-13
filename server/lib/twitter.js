'use strict';

var Twitter = require('node-tweet-stream');

module.exports = function(){
  var t = new Twitter({
    consumer_key: process.env.EN_TWIT_CONSUMER_Key,
    consumer_secret: process.env.EN_TWIT_CONSUMER_Sec,
    token: process.env.EN_TWIT_ACCESS_Tok,
    token_secret: process.env.EN_TWIT_ACCESS_Sec
  });


  t.track('artnownashville');
  t.track('nashvillearts');
  t.track('fristcenter');
  t.track('artobernash');
  t.track('nashvilleartcrawl');
  t.track('metroarts1');
  t.track('enlighTNdemo');

  t.on('error', function(err){
    console.log('tweet error ', err);
  });

  return t;
};

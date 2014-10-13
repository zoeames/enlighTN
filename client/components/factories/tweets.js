/*global io*/
(function(){
  'use strict';

  angular.module('enlighTN')
  .factory('Tweets', [function(){
    var socket = io.connect();

    return {
      onTweet: function(callback){
        socket.on('tweet', callback);
      }
    };
  }]);
})();

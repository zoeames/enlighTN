(function(){
  'use strict';

  angular.module('enlighTN')
  .factory('Event', ['$http', function($http){

    function findById(eventId){
      return $http.get('/events/' + eventId);
    }

    function rsvp(eventId){
      return $http.post('/events/' + eventId + '/rsvp');
    }

    return {findById:findById, rsvp:rsvp};
  }]);
})();


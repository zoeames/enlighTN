(function(){
  'use strict';

  angular.module('enlighTN')
  .factory('Event', ['$http', function($http){

    function findById(eventId){
      return $http.get('/events/' + eventId);
    }

    return {findById:findById};
  }]);
})();


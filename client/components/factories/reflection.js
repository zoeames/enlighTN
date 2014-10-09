(function(){
  'use strict';

  angular.module('enlighTN')
  .factory('Reflection', ['$http', function($http){

    function create(reflection){
      return $http.post('/reflect', reflection);
    }

    function update(reflection){
      return $http.put('dashboard/reflect', reflection);
    }

    function castVote(locId, reflectId){
      return $http.post('/location/' + locId + '/reflect/' + reflectId);
    }

    return {create:create, update:update, castVote:castVote};
  }]);
})();


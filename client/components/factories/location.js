(function(){
  'use strict';

  angular.module('enlighTN')
  .factory('Location', ['$http', function($http){

    function all(){
      return $http.get('/locations');
    }

    function findById(locId){
      return $http.get('/locations/' + locId);
    }

    return {all:all, findById:findById};
  }]);
})();


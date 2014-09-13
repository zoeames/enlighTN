(function(){
  'use strict';

  angular.module('enlighTN')
  .factory('Location', ['$http', function($http){

    function all(){
      return $http.get('/locations');
    }

    return {all:all};
  }]);
})();


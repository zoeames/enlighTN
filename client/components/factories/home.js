(function(){
  'use strict';

  angular.module('enlighTN')
  .factory('Home', ['$http', function($http){
    function getMessage(){
      return $http.get('/home');
    }

    return {getMessage:getMessage};

  }]);
})();


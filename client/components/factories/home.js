(function(){
  'use strict';

  angular.module('enlighTN')
  .factory('Home', ['$http', function($http){

    function getMessage(){
      return $http.get('/home');
    }

    function getCurrentEvents(){
      return $http.get('/events');
    }

    return {getMessage:getMessage, getCurrentEvents:getCurrentEvents};

  }]);
})();


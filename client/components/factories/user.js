(function(){
  'use strict';

  angular.module('enlighTN')
  .factory('User', ['$http', function($http){

    function register(user){
      return $http.post('/register', user);
    }

    function login(user){
      return $http.post('/login', user);
    }

    function logout(){
      return $http.delete('/logout');
    }

    function show(){
      return $http.get('/dashboard');
    }

    return {register:register, login:login, logout:logout, show:show};

  }]);
})();


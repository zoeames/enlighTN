(function(){
  'use strict';

  angular.module('enlighTN')
  .controller('SplashCtrl', ['$scope', 'User', '$location', function($scope, User, $location){
    //login------------------------------------------
    $scope.user = {};

    function success(response){
      toastr.success('Successful login.');
      $location.path('/home');
    }

    function failure(response){
      toastr.error('Error during login, try again.');
      $scope.user = {};
    }

    $scope.login = function(){
      User.login($scope.user).then(success, failure);
    };
    //register----------------------------------------
    $scope.regUser = {};

    function regSuccess(response){
      toastr.success('User successfully registered.');
      $location.path('/login');
    }

    function regFailure(response){
      toastr.error('Error during user registration, try again.');
      $scope.regUser = {};
    }

    $scope.register = function(){
      User.register($scope.regUser).then(regSuccess, regFailure);
    };
  }]);
})();


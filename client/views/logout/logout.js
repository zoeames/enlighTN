(function(){
  'use strict';

  angular.module('enlighTN')
  .controller('LogoutCtrl', ['$location', 'User', function($location, User){
    User.logout().then(function(){
      toastr.info('You have successfully logged out.');
      $location.path('/');
    });
  }]);
})();


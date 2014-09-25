(function(){
  'use strict';

  angular.module('enlighTN')
  .controller('HomeCtrl', ['$scope', 'Home', '$interval', function($scope, Home, $interval){


    Home.getMessage().then(function(response){
      $scope.theArts = response.data.creativeList;

      $interval(function(){
        $scope.art = _.shuffle($scope.theArts)[0];
      }, 1000);
    });

    Home.getCurrentEvents().then(function(response){
      $scope.events = response.data.occasions;
    });

  }]);
})();


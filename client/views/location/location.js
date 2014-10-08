(function(){
  'use strict';

  angular.module('enlighTN')
  .controller('LocationCtrl', ['$scope', 'Location', '$routeParams', function($scope, Location, $routeParams){
    $scope.loc = {};
    $scope.occasions = [];
    $scope.myInterval = 10000;

    $scope.slides = [{},{},{},{},{},{}];

    Location.findById($routeParams.locId).then(function(response){
      $scope.loc       = response.data.loc;
      $scope.fav       = response.data.fav;
      $scope.occasions = response.data.occasions;
      $scope.title     = $scope.loc.title;
    });

    $scope.favorite = function(){
      Location.favorite($routeParams.locId).then(function(response){
        $scope.loc = response.data.loc;
        $scope.fav = response.data.fav;
      });
    };

  }]);
})();


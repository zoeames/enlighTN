(function(){
  'use strict';

  angular.module('enlighTN')
  .controller('LocationCtrl', ['$scope', 'Location', '$routeParams', function($scope, Location, $routeParams){
    $scope.loc = {};

    Location.findById($routeParams.locId).then(function(response){
      $scope.loc = response.data.loc;
      $scope.title = $scope.loc.title;
    });
  }]);
})();


(function(){
  'use strict';

  angular.module('enlighTN')
  .controller('LocationIndexCtrl', ['$scope', 'Location', function($scope, Location){
    $scope.title     = 'Locations Index Page!';
    $scope.locations = [];
    $scope.pos       = {lat: 36.1667, lng: -86.7833};

    Location.all().then(function(response){
      $scope.locations = response.data.locations;
    });


  }]);
})();


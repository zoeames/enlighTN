(function(){
  'use strict';

  angular.module('enlighTN')
  .controller('LocationIndexCtrl', ['$scope', 'Location', function($scope, Location){
    $scope.title = 'Locations Index Page!';
    $scope.locations = [];

    Location.all().then(function(response){
      $scope.locations = response.data.locations;
    });


  }]);
})();


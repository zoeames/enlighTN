(function(){
  'use strict';

  angular.module('enlighTN')
  .controller('LocationCtrl', ['$scope', 'Location', function($scope, Location){
    $scope.title = 'Location Page!';
    $scope.locations = [];

    //Location.all().then(function(response){
      //$scope.locations = response.data.locations;
    //});

  }]);
})();


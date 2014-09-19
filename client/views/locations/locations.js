(function(){
  'use strict';

  angular.module('enlighTN')
  .controller('LocationIndexCtrl', ['$scope', 'Location', '$filter', 'ngTableParams','$interval', function($scope, Location, $filter, ngTableParams, $interval){
    $scope.title     = 'Locations Index Page!';


    $scope.locations = [];
    $scope.pos       = {lat: 36.1667, lng: -86.7833};


    Location.all().then(function(response){
      $scope.locations = response.data.locations;
    });

    $scope.id = $interval(Location.getPositions, 1000);

    $scope.tableParams = new ngTableParams({
      page: 1,            // show first page
      count: 25,          // count per page
      filter :{
        title: ''
      },
      sort: {
        distance: 'asc'
      }
    },{
      total: $scope.locations.length, // length of data
      getData: function($defer, params){
        var orderedData = params.filter() ?
        $filter('filter')($scope.locations, params.filter()) :
        $scope.locations;

        $scope.locs = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

        params.total(orderedData.length); // set total for recalc pagination
        $defer.resolve($scope.locs);
      }
    });
  }]);
})();


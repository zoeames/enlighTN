(function(){
  'use strict';

  angular.module('enlighTN')
  .controller('LocationIndexCtrl', ['$scope', 'Location', '$filter', 'ngTableParams', '$q', function($scope, Location, $filter, ngTableParams, $q){
    $scope.title     = 'Locations Index Page!';
    $scope.locations = [];
    $scope.pos       = {lat: 36.1667, lng: -86.7833};
    $scope.filters = {
      status: ''
    };

    Location.all().then(function(response){
      $scope.locations = response.data.locations;
    });


    $scope.tableParams = new ngTableParams({
      page: 1,            // show first page
      count: 25,          // count per page
      filter :{
        title: ''
      },
      sort: {
        popularity: 'asc'
      }
    },{
      total: $scope.locations.length, // length of data
      getData: function($defer, params){
        var orderedData = params.filter() ?
        $filter('filter')($scope.locations, params.filter()) :
        $scope.locations;

        orderedData = params.sorting() ?
        $filter('orderBy')(orderedData, params.orderBy()) :
        $scope.locations;

        $scope.locs = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

        params.total(orderedData.length); // set total for recalc pagination
        $defer.resolve($scope.locs);
      }
    });
    var inArray = Array.prototype.indexOf ?
      function(val, arr){
        return arr.indexOf(val);
      } :
      function(val, arr){
        var i = arr.length;
        while(i--){
          if(arr[i] === val){return i;}
        }
        return -1;
      };
    $scope.types = function(column){
      var def = $q.defer(),
        arr = [],
        types = [];
      angular.forEach($scope.locations, function(item){
        if(inArray(item.type, arr) === -1){
          arr.push(item.type);
          types.push({
            'id': item.type,
            'title': item.type
          });
        }
      });
      def.resolve(types);
      return def;
    };
  }]);
})();


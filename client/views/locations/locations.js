/* global google */

(function(){
  'use strict';

  angular.module('enlighTN')
  .controller('LocationIndexCtrl', ['$scope', 'Location', '$filter', 'ngTableParams','$interval', '$q', '$rootScope', function($scope, Location, $filter, ngTableParams, $interval, $q, $rootScope){
    $scope.title     = 'Locations';
    $scope.locations = [];
    $scope.positions = [];
    $scope.types     = ['Metro Installations', 'Historic Marker', 'Civic', 'Metro Galleries'];
    $scope.pos       = {lat: 36.1667, lng: -86.7833};

    Location.all().then(function(response){
      $scope.locations = response.data.locations;
    });

    $scope.tableParams = new ngTableParams({
      page: 1,            // show first page
      count: 10,          // count per page
      filter :{
        title: ''
      },
      sort: {
        favorites: 'desc'
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

        getPositions($scope.locs);
        changeMarkers();

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

    $scope.groups = function(column){
      var def = $q.defer(),
        arr = [],
        groups = [];
      // change $scope.types to $scope.locations when figure out how to do this with promises
      angular.forEach($scope.types, function(item){
        if(inArray(item, arr) === -1){
          arr.push(item);
          groups.push({
            'id': item,
            'title': item
          });
        }
      });
      def.resolve(groups);
      return def;
    };

    function toTitleCase(str){
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    function getPositions(arr){
      $scope.positions = [];
      angular.forEach(arr, function(pos){
        $scope.positions.push({name:toTitleCase(pos.title.substring(0,20)), lat:pos.lat, lng:pos.lng});
      });
    }

    function addMarker(map, lat, lng, name){
      var latLng = new google.maps.LatLng(lat, lng),
          mark = new google.maps.Marker({map: map, position: latLng, title: name, animation: google.maps.Animation.DROP});
      return(mark);
    }

    function clearMarkers(){
      for (var i = 0; i < $scope.markers.length; i++) {
        $scope.markers[i].setMap(null);
      }
    }

    function changeMarkers(){
      if($scope.markers){clearMarkers();}

      $scope.markers = [];
      $scope.positions.forEach(function(pos){
        var marker = addMarker($rootScope.map, pos.lat, pos.lng, pos.name);
        $scope.markers.push(marker);
      });
    }

    $scope.$on('map', function(){
      getPositions($scope.locs);
      changeMarkers();
    });
  }]);
})();


/* global google */
(function(){
  'use strict';

  angular.module('enMapModule', [])
  .factory('MapService', [function(){
    function initMap(selector, lat, lng, zoom){
      var styles     = [{'featureType':'water','stylers':[{'visibility':'on'},{'color':'#b5cbe4'}]},{'featureType':'landscape','stylers':[{'color':'#efefef'}]},{'featureType':'road.highway','elementType':'geometry','stylers':[{'color':'#83a5b0'}]},{'featureType':'road.arterial','elementType':'geometry','stylers':[{'color':'#bdcdd3'}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#ffffff'}]},{'featureType':'poi.park','elementType':'geometry','stylers':[{'color':'#e3eed3'}]},{'featureType':'administrative','stylers':[{'visibility':'on'},{'lightness':33}]},{'featureType':'road'},{'featureType':'poi.park','elementType':'labels','stylers':[{'visibility':'on'},{'lightness':20}]},{},{'featureType':'road','stylers':[{'lightness':20}]}],
          mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles:styles},
          map        = new google.maps.Map(document.getElementById(selector), mapOptions);

      return map;
    }

    return{initMap:initMap};
  }])
  .directive('enMap', ['MapService', function(MapService){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/en-map/en-map.html';
    o.scope       = {lat:'@', lng:'@', zoom:'@'};
    o.link        = function(scope, element, attrs){
    };
    o.controller  = ['$scope', 'MapService', '$rootScope', function($scope, MapService, $rootScope){
      $scope.$on('position', function(event, pos){
        $rootScope.map = MapService.initMap('map', pos.coords.latitude * 1, pos.coords.longitude * 1, $scope.zoom * 1);
        $rootScope.$broadcast('map');
      });

      $rootScope.map = MapService.initMap('map', $scope.lat * 1, $scope.lng * 1, $scope.zoom * 1);
    }];

    return o;

  }]);
})();

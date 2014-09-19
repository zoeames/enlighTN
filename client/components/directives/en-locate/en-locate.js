/* jshint camelcase:false */
(function(){
  'use strict';

  angular.module('enLocateModule', [])
  .factory('LocationService', ['$q', function($q){
    function locate(){
      var deferred = $q.defer(),
        options = {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        };
      navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject, options);

      return deferred.promise;
    }
    return {locate:locate};
  }])
  .directive('enLocate', ['LocationService', function(LocationService){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/en-locate/en-locate.html';
    o.scope       = {};
    o.link        = function(scope, element, attrs){
    };
    o.controller  = ['$scope', '$rootScope','LocationService', function($scope, $rootScope, $locationService){
      $scope.findMe = function(){
        LocationService.locate().then(success, error);
      };
      function success(pos){
        $rootScope.$broadcast('position', pos);
        console.log(pos);
      }
      function error(err){
        console.log(err);
      }
    }];

    return o;

  }]);
})();

(function(){
  'use strict';

  angular.module('enlighTN')
  .controller('EventCtrl', ['$scope', 'Event', '$routeParams', function($scope, Event, $routeParams){

    Event.findById($routeParams.eventId).then(function(response){
      $scope.occasion = response.data.occasion;
      $scope.title = $scope.occasion.name;
      $scope.tag = $scope.occasion.type;
      $scope.description = $scope.occasion.description;
    });
  }]);
})();


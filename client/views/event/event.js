(function(){
  'use strict';

  angular.module('enlighTN')
  .controller('EventCtrl', ['$scope', 'Event', '$routeParams', function($scope, Event, $routeParams){

    Event.findById($routeParams.eventId).then(function(response){
      $scope.occasion = response.data.occasion;
      $scope.rsvp = response.data.rsvp;
    });

    $scope.attend = function(){
      Event.rsvp($routeParams.eventId).then(function(response){
        $scope.occasion = response.data.occasion;
        $scope.rsvp = response.data.rsvp;
      });
    };
  }]);
})();


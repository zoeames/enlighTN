(function(){
  'use strict';

  angular.module('enlighTN')
  .controller('LocationCtrl', ['$scope', 'Location', '$routeParams', function($scope, Location, $routeParams){
    $scope.loc = {};
    $scope.occasions = [];
    $scope.myInterval = 10000;
    $scope.vote = false;

    //add convert loc.responses to slides method
    $scope.slides = [{
      img: '/assets/avatars/yellow-glasses.png',
      user: 'himynameis',
      title: 'This is What I think.',
      body: 'The literature would have us believe that a nimbused fold is not but a drama. The competition of a yarn becomes a zonate samurai. Few can name a neuter ear that isn\'t an outsize loaf. However, their kale was, in this moment, a grainy dinosaur.'
    },{
      img: '/assets/avatars/yellow-glasses.png',
      user: 'himynameis',
      title: 'This is What I think.',
      body: 'The literature would have us believe that a nimbused fold is not but a drama. The competition of a yarn becomes a zonate samurai. Few can name a neuter ear that isn\'t an outsize loaf. However, their kale was, in this moment, a grainy dinosaur.'
    },{
      img: '/assets/avatars/yellow-glasses.png',
      user: 'himynameis',
      title: 'This is What I think.',
      body: 'The literature would have us believe that a nimbused fold is not but a drama. The competition of a yarn becomes a zonate samurai. Few can name a neuter ear that isn\'t an outsize loaf. However, their kale was, in this moment, a grainy dinosaur.'
    },{
      img: '/assets/avatars/yellow-glasses.png',
      user: 'himynameis',
      title: 'This is What I think.',
      body: 'The literature would have us believe that a nimbused fold is not but a drama. The competition of a yarn becomes a zonate samurai. Few can name a neuter ear that isn\'t an outsize loaf. However, their kale was, in this moment, a grainy dinosaur.'
    },{
      img: '/assets/avatars/yellow-glasses.png',
      user: 'himynameis',
      title: 'This is What I think.',
      body: 'The literature would have us believe that a nimbused fold is not but a drama. The competition of a yarn becomes a zonate samurai. Few can name a neuter ear that isn\'t an outsize loaf. However, their kale was, in this moment, a grainy dinosaur.'
    },{
      img: '/assets/avatars/yellow-glasses.png',
      user: 'himynameis',
      title: 'This is What I think.',
      body: 'The literature would have us believe that a nimbused fold is not but a drama. The competition of a yarn becomes a zonate samurai. Few can name a neuter ear that isn\'t an outsize loaf. However, their kale was, in this moment, a grainy dinosaur.'
    }];

    Location.findById($routeParams.locId).then(function(response){
      $scope.loc       = response.data.loc;
      $scope.fav       = response.data.fav;
      $scope.occasions = response.data.occasions;
      $scope.title     = $scope.loc.title;
    });

    $scope.favorite = function(){
      Location.favorite($routeParams.locId).then(function(response){
        $scope.loc = response.data.loc;
        $scope.fav = response.data.fav;
      });
    };

  }]);
})();


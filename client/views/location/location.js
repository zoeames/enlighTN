(function(){
  'use strict';

  angular.module('enlighTN')
  .controller('LocationCtrl', ['$scope', 'Location', '$routeParams', '$modal', function($scope, Location, $routeParams, $modal){
    $scope.loc = {};
    $scope.occasions = [];
    $scope.myInterval = 10000;
    $scope.vote = false;

    //add convert loc.responses to slides method
    $scope.slides = [[{
      _id: '1',
      img: '/assets/avatars/yellow-glasses.png',
      user: 'himynameis',
      title: 'This is What I think.',
      body: 'The literature would have us believe that a nimbused fold is not but a drama. The competition of a yarn becomes a zonate samurai. Few can name a neuter ear that isn\'t an outsize loaf. However, their kale was, in this moment, a grainy dinosaur.'
    },{
      _id: '2',
      img: '/assets/avatars/yellow-glasses.png',
      user: 'himynameis',
      title: 'This is What I think.',
      body: 'The literature would have us believe that a nimbused fold is not but a drama. The competition of a yarn becomes a zonate samurai. Few can name a neuter ear that isn\'t an outsize loaf. However, their kale was, in this moment, a grainy dinosaur.'
    },{
      _id: '3',
      img: '/assets/avatars/yellow-glasses.png',
      user: 'himynameis',
      title: 'This is What I think.',
      body: 'The literature would have us believe that a nimbused fold is not but a drama. The competition of a yarn becomes a zonate samurai. Few can name a neuter ear that isn\'t an outsize loaf. However, their kale was, in this moment, a grainy dinosaur.'
    }],[{
      _id: '4',
      img: '/assets/avatars/yellow-glasses.png',
      user: 'himynameis',
      title: 'This is What I think.',
      body: 'The literature would have us believe that a nimbused fold is not but a drama. The competition of a yarn becomes a zonate samurai. Few can name a neuter ear that isn\'t an outsize loaf. However, their kale was, in this moment, a grainy dinosaur.'
    },{
      _id: '5',
      img: '/assets/avatars/yellow-glasses.png',
      user: 'himynameis',
      title: 'This is What I think.',
      body: 'The literature would have us believe that a nimbused fold is not but a drama. The competition of a yarn becomes a zonate samurai. Few can name a neuter ear that isn\'t an outsize loaf. However, their kale was, in this moment, a grainy dinosaur.'
    },{
      _id: '6',
      img: '/assets/avatars/yellow-glasses.png',
      user: 'himynameis',
      title: 'This is What I think.',
      body: 'The literature would have us believe that a nimbused fold is not but a drama. The competition of a yarn becomes a zonate samurai. Few can name a neuter ear that isn\'t an outsize loaf. However, their kale was, in this moment, a grainy dinosaur.'
    }]];

    Location.findById($routeParams.locId).then(function(response){
      $scope.loc         = response.data.loc;
      $scope.fav         = response.data.fav;
      $scope.occasions   = response.data.occasions;
      $scope.reflections = response.data.reflections;
      $scope.title       = $scope.loc.title;
    });

    $scope.favorite = function(){
      Location.favorite($routeParams.locId).then(function(response){
        $scope.loc = response.data.loc;
        $scope.fav = response.data.fav;
      });
    };

    $scope.castVote = function(id){
      console.log(id);
    };

    $scope.open = function(size){
      var modalInstance = $modal.open({
        templateUrl: 'views/makeReflection/makeReflection.html',
        controller: 'MakeReflectionCtrl',
        size: size,
        resolve: {
          loc: function(){
            return $routeParams.locId;
          }
        }
      });

      modalInstance.result.then(function(newReflection){
        toastr.success('Your reflections was saved. You can edit it on your dashboard.');
        $scope.newReflection = newReflection;
      });
    };

    $scope.$watch(
      'reflections',
      function(newValue, oldValue){
        var count = 0;
        $scope.slides = {};

        newValue = _.sortBy(newValue, function(item){return item.upvote.length;}).reverse();
        newValue = newValue.map(function(item, index){
          if(index % 3 === 0){count++;}

          switch(index){
            case 0:
              item.img  = 'assets/avatars/orange-glasses.png';
              item.type = 'Curator';
              break;
            case 1:
              item.img  = 'assets/avatars/pink-glasses.png';
              item.type = 'Patron';
              break;
            default:
              item.img  = 'assets/avatars/blue-glasses.png';
              item.type = 'Appreciator';
              break;
          }

          item.blurb = item.text.substring(0, 170).concat('...');
          $scope.slides[count] = $scope.slides[count] || [];
          $scope.slides[count].push(item);
        });
      }
    );

  }]);
})();


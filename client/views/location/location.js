(function(){
  'use strict';

  angular.module('enlighTN')
  .controller('LocationCtrl', ['$scope', 'Location', 'Reflection', '$routeParams', '$modal', function($scope, Location, Reflection, $routeParams, $modal){
    $scope.loc = {};
    $scope.occasions = [];
    $scope.myInterval = 10000;
    $scope.vote = false;

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

    $scope.castVote = function(parentIndex, index){
      var reflectId = $scope.slides[parentIndex][index]._id;
      Reflection.castVote($routeParams.locId, reflectId).then(function(response){
        console.log(response);
        $scope.slides[parentIndex][index].vote = !$scope.slides[parentIndex][index].vote;
      });
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
        var count = -1;
        $scope.slides = {};

        newValue = _.sortBy(newValue, function(item){return item.upvote.length;}).reverse();
        newValue = newValue.map(function(item, index){
          if(index % 3 === 0){count++;}

          if(index === 0 && item.upvote.length > 1){
            item.img  = 'assets/avatars/orange-glasses.png';
            item.type = 'Curator';
          }else if(index === 1 && item.upvote.length > 0){
            item.img  = 'assets/avatars/pink-glasses.png';
            item.type = 'Patron';
          }else{
            item.img  = 'assets/avatars/blue-glasses.png';
            item.type = 'Appreciator';
          }

          item.blurb = item.text.substring(0, 170).concat('...');
          $scope.slides[count] = $scope.slides[count] || [];
          $scope.slides[count].push(item);
        });
      }
    );

  }]);
})();


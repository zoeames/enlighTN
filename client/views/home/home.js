(function(){
  'use strict';

  angular.module('enlighTN')
  .controller('HomeCtrl', ['$scope', 'Home', '$interval', function($scope, Home, $interval){

    $scope.feeds = [
      'http://www.nashvillescene.com/nashville/Rss.xml?section=1178035',
      'http://nashvillearts.com/feed/'
    ];
    Home.getMessage().then(function(response){
      $scope.theArts = response.data.creativeList;

      $interval(function(){
        $scope.art = _.shuffle($scope.theArts)[0];
      }, 3000);
    });

    Home.getCurrentEvents().then(function(response){
      $scope.events = response.data.occasions;
    });

  }]);
})();


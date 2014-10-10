(function(){
  'use strict';

  angular.module('enlighTN')
  .controller('DashboardCtrl', ['$scope', function($scope){
    $scope.showReflect = {};
    $scope.user = {
      name: 'Stella Bella',
      email: 'stella@gmail.com'
    };
    $scope.reflections = [
      {date:'12/13/14', title:'Wise, if not slightly pedantic.', body:'A kidney of the match is assumed to be a kittle blow. The literature would have us believe that a brainsick spinach is not but a cancer.'},
      {date:'12/13/14', title:'Wise, if not slightly pedantic.', body:'A kidney of the match is assumed to be a kittle blow. The literature would have us believe that a brainsick spinach is not but a cancer.'}
    ];
// Quote Shuffler-------------------------------------------
    $scope.quotes = [
      {body: 'You can\'t just give someone a creativity injection. You have to create an environment for curiosity and a way to encourage people and get the best out of them.', author:'Ken Robinson'},
      {body: 'Creativity involves breaking out of established patterns in order to look at things in a different way.', author: 'Edward de Bono'},
      {body: 'Creativity is not just for artists. It\'s for businesspeople looking for a new way to close a sale; it\'s for engineers trying to solve a problem; it\'s for parents who want their children to see the world in more than one way.', author: 'Twyla Tharp'},
      {body: 'Creativity is the power to connect the seemingly unconnected.', author: 'William Plomer'},
      {body: 'Creativity is always a leap of faith. You\'re faced with a blank page, blank easel, or an empty stage.', author:'Julia Cameron'},
      {body: 'The tantalizing discomfort of perplexity is what inspires otherwise ordinary men and women to extraordinary feats of ingenuity and creativity; nothing quite focuses the mind like dissonant details awaiting harmonious resolution.', author:'Brian Greene'},
      {body: 'Creativity is piercing the mundane to find the marvelous.', author: 'Bill Moyers'}
    ];

    $scope.init = function(){
      var shuffledQuotes = _.shuffle($scope.quotes),
      quote = _.sample(shuffledQuotes, [1]);
      $scope.quote = quote[0];
    };
// Toggle forms---------------------------------------------
    $scope.toggleEdit = function(){
      $scope.showEdit = !!!$scope.showEdit;
    };

    $scope.toggleReflect = function(index){
      $scope.showReflect[index] = !!!$scope.showReflect[index];
    };

  }]);
})();


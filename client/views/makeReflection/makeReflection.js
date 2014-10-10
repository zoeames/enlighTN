(function(){
  'use strict';

  angular.module('enlighTN')
  .controller('MakeReflectionCtrl', ['$scope', '$modalInstance', 'loc', function($scope, $modalInstance, loc){

    $scope.locId = loc;

    $scope.ok = function(){
      $modalInstance.close('this is your reflection');
    };

    $scope.cancel = function(){
      $modalInstance.dismiss('cancel');
    };

  }]);
})();


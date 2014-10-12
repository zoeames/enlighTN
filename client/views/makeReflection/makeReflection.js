(function(){
  'use strict';

  angular.module('enlighTN')
  .controller('MakeReflectionCtrl', ['$scope', '$modalInstance', 'Reflection', 'loc', function($scope, $modalInstance, Reflection, loc){

    $scope.locId = loc;

    $scope.ok = function(reflection){
      reflection.locId = $scope.locId;
      Reflection.create(reflection).then(function(){
        $modalInstance.close(reflection);
      });
    };

    $scope.cancel = function(){
      $modalInstance.dismiss('cancel');
    };

  }]);
})();


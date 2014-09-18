(function(){
  'use strict';

  angular.module('enTableModule', ['ngTable'])
  .directive('enTable', ['$scope', 'ngTableParams', function($scope, ngTableParams){
    var o = {};
    o.templateUrl = '/components/directives/en-table/en-table.html';
    var data = [];
    $scope.tableParams = new ngTableParams({
      page: 1,            // show first page
      count: 10,           // count per page
      sorting:{
        name: 'asc'     // initial sorting
      }
    },{
      total: data.length, // length of data
      getData: function($defer, params){
        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });

    return o;
  }]);
})();

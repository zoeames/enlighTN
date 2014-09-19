(function(){
  'use strict';

  angular.module('enlighTN')
  .factory('Location', ['$http', function($http){

    function all(){
      return $http.get('/locations');
    }

    function findById(locId){
      return $http.get('/locations/' + locId);
    }
    function getPositions(){
      var positions = $('table tbody tr').toArray().map(function(tr){
          var name =  $(tr).attr('data-title'),
          lat =  $(tr).attr('data-lat'),
          lng =  $(tr).attr('data-lng'),
          pos = {name:name, lat:parseFloat(lat), lng:parseFloat(lng)};
          return(pos);

        });
      return positions;
    }

    return {all:all, findById:findById, getPositions:getPositions};
  }]);
})();


(function(){
  'use strict';

  angular.module('enlighTN', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/splash/splash.html', controller:'SplashCtrl'})
    .when('/home', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/dashboard', {templateUrl:'/views/dashboard/dashboard.html', controller:'DashboardCtrl'})
    .when('/event/:eventId', {templateUrl:'/views/event/event.html', controller:'EventCtrl'})
    .when('/location/index', {templateUrl:'/views/locations/locations.html', controller:'LocationsCtrl'})
    .when('/location/:locId', {templateUrl:'/views/location/location.html', controller:'LocationCtrl'})
    .otherwise({redirectTo:'/'});
  }]);
})();


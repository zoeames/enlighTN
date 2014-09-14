(function(){
  'use strict';

  angular.module('enlighTN', ['ngRoute', 'ui.bootstrap'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/splash/splash.html', controller:'SplashCtrl'})
    .when('/home', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/dashboard', {templateUrl:'/views/dashboard/dashboard.html', controller:'DashboardCtrl'})
    .when('/events/:eventId', {templateUrl:'/views/event/event.html', controller:'EventCtrl'})
    .when('/locations/:locId', {templateUrl:'/views/location/location.html', controller:'LocationCtrl'})
    .when('/locations', {templateUrl:'/views/locations/locations.html', controller:'LocationIndexCtrl'})
    .otherwise({redirectTo:'/'});
  }]);
})();


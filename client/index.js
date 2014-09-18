(function(){
  'use strict';

  angular.module('enlighTN', ['ngRoute','LocalForageModule', 'ui.bootstrap', 'snap', 'ngTable'])
  .config(['$routeProvider','$httpProvider','$localForageProvider', function($routeProvider, $httpProvider, $localForageProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/splash/splash.html', controller:'SplashCtrl'})
    .when('/register', {templateUrl:'/views/register/register.html', controller:'RegisterCtrl'})
    .when('/login',    {templateUrl:'/views/login/login.html', controller:'LoginCtrl'})
    .when('/logout',   {templateUrl:'/views/logout/logout.html', controller:'LogoutCtrl'})
    .when('/home', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/dashboard', {templateUrl:'/views/dashboard/dashboard.html', controller:'DashboardCtrl'})
    .when('/events/:eventId', {templateUrl:'/views/event/event.html', controller:'EventCtrl'})
    .when('/locations/:locId', {templateUrl:'/views/location/location.html', controller:'LocationCtrl'})
    .when('/locations', {templateUrl:'/views/locations/locations.html', controller:'LocationIndexCtrl'})
    .otherwise({redirectTo:'/'});


    $httpProvider.interceptors.push('HttpInterceptor');
    $localForageProvider.config({name:'enlighTN', storeName:'cache', version:1.0});
  }]);
})();


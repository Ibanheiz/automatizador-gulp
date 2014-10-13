(function(angular){
'use strict';

angular.module('ibanheiz', [
  'ngRoute',
  'ibanheiz.controllers'
]).
config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '',
      controller: 'appController'
    }).
    otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
}]);
})(angular);

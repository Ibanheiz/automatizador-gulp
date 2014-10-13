(function(angular){
'use strict';

angular.module('ibanheiz.modules.Site.controllers', [])
  .controller('appController',  ['$scope', '$http', function ($scope, $http) {
    // Mensagem inicial
    $scope.message = 'Automatizador Gulp';

  }]);
})(angular);

(function () {
  'use strict';

  angular.module('corporateDashboard.controllers')
    .controller('barCtrl', ['$scope', 'barService', function($scope, barService){
      $scope.d3Data = barService.getBarData().query();
    }])
}());

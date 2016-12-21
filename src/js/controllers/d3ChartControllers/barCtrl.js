(function () {
  'use strict';

  angular.module('corporateDashboard.controllers')
    .controller('barCtrl', ['$scope', '$resource', function($scope, $resource){
      var BarData = $resource('https://fleemaja.github.io/corporate_dashboard/data/barChart.json');
      $scope.title = "barCtrl";
      $scope.d3Data = BarData.query();
    }])
}());

(function () {
  'use strict';

  angular.module('corporateDashboard.controllers')
    .controller('barCtrl', ['$scope', '$timeout', '$location', 'barService', function($scope, $timeout, $location, barService){

      (function tick() {
        $scope.d3Data = barService.getBarData().query(function(){
            var lp = $location.path();
            if (lp != '/geospatial' && lp != '/data') {
              $timeout(tick, 30000);
            }
        });
      })();

  }])
}());

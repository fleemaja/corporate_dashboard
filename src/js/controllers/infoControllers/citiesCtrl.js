(function () {
  'use strict';

  angular.module('corporateDashboard.controllers')
    .controller('citiesCtrl', ['$scope', '$timeout', '$location', 'citiesService', function($scope, $timeout, $location, citiesService) {

      (function tick() {
        $scope.objects = citiesService.getCitiesData().query(function(){
            if ($location.path() == '/geospatial') {
              $timeout(tick, 30000);
            }
        });
      })();


    }])


}());

(function () {
  'use strict';

  angular.module('corporateDashboard.controllers')
    .controller('citiesCtrl', ['$scope', 'citiesService', function($scope, citiesService) {
      $scope.objects = citiesService.getCitiesData().query();
    }])


}());

(function () {
  'use strict';

  angular.module('corporateDashboard.controllers')
    .controller('citiesCtrl', ['$scope', '$resource', function($scope, $resource) {
      var City = $resource('https://fleemaja.github.io/corporate_dashboard/data/cities.json');
      $scope.objects = City.query();
    }])


}());

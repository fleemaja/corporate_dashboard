(function () {
  'use strict';

  angular.module('corporateDashboard.controllers')
  .controller('geospatialCtrl', ['$scope', 'geoService', function($scope, geoService){
    $scope.mapData = geoService.getGeoData().get(function() {
      $('.load-animation').hide();
    });
  }]);

}());

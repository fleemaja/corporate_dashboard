(function () {
  'use strict';

  angular.module('corporateDashboard.services')
    .service('barService', ['$resource', function($resource){
      this.getBarData = function() {
        return $resource('./data/barChart.json');
      }
    }])
}());

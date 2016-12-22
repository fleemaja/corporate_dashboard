(function () {
  'use strict';

  angular.module('corporateDashboard.services')
    .service('barService', ['$resource', function($resource){
      this.getBarData = function() {
        return $resource('https://fleemaja.github.io/corporate_dashboard/data/barChart.json');
      }
    }])
}());

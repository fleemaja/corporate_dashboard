(function () {
  'use strict';

  angular.module('corporateDashboard.services')
    .service('citiesService', ['$resource', function($resource){
      this.getCitiesData = function() {
        return $resource('https://fleemaja.github.io/corporate_dashboard/data/cities.json');
      }
    }])
}());

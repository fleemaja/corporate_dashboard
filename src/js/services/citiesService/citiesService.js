(function () {
  'use strict';

  angular.module('corporateDashboard.services')
    .service('citiesService', ['$resource', function($resource){
      this.getCitiesData = function() {
        return $resource('./data/cities.json');
      }
    }])
}());

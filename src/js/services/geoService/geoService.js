(function () {
  'use strict';

  angular.module('corporateDashboard.services')
    .service('geoService', ['$resource', function($resource){
      this.getGeoData = function() {
        return $resource('./data/world.json');
      }
    }])

}());

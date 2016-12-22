(function () {
  'use strict';

  angular.module('corporateDashboard.services')
    .service('openIssuesService', ['$resource', function($resource){
      this.getOpenIssuesData = function() {
        return $resource('https://fleemaja.github.io/corporate_dashboard/data/issues.json');
      }
    }])
}());

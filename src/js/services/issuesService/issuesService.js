(function () {
  'use strict';

  angular.module('corporateDashboard.services')
    .service('issuesService', ['$resource', function($resource){
      this.getIssuesData = function() {
        return $resource('https://fleemaja.github.io/corporate_dashboard/data/issues.json');
      }
    }])
}());

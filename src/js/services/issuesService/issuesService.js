(function () {
  'use strict';

  angular.module('corporateDashboard.services')
    .service('issuesService', ['$resource', function($resource){
      this.getIssuesData = function() {
        return $resource('./data/issues.json');
      }
    }])
}());

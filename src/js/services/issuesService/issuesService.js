(function () {
  'use strict';

  angular.module('corporateDashboard.services')
    .service('issuesService', ['$resource', function($resource){
      this.getIssuesData = function() {
        return $resource('https://api.github.com/repos/angular-ui/bootstrap/issues');
      }
    }])
}());

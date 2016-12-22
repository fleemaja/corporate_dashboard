(function () {
  'use strict';

  angular.module('corporateDashboard.services')
    .service('openIssuesService', ['$resource', function($resource){
      this.getOpenIssuesData = function() {
        return $resource('https://api.github.com/repos/angular-ui/bootstrap/issues');
      }
    }])
}());

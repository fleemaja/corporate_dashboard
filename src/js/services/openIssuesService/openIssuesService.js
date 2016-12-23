(function () {
  'use strict';

  angular.module('corporateDashboard.services')
    .service('openIssuesService', ['$resource', function($resource){
      this.getOpenIssuesData = function() {
        return $resource('./data/issues.json');
      }
    }])
}());

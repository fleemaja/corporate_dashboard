(function(angular) {
  'use strict';
  var corporateDashboard = angular.module('corporateDashboard',
      ['ngAnimate',
      'corporateDashboard.controllers', 'corporateDashboard.directives']
    );

  // setup dependency injection
  angular.module('d3', []);
  angular.module('corporateDashboard.controllers', []);
  angular.module('corporateDashboard.directives', ['d3']);

  corporateDashboard.controller('viewController', ['$scope', '$location', function($scope, $location) {
      $location.path('/geospatial');
      $scope.setPagename = function(path) { $location.path(path); };
      $scope.getPagename = function() { return $location.path(); }
    }]);
})(window.angular);

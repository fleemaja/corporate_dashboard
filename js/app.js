(function(angular) {
  'use strict';
  angular.module('corporateDashboard', ['ngAnimate'])
    .controller('viewController', ['$scope', '$location', function($scope, $location) {
      $scope.items = ['geospatial', 'metrics', 'data'];
      $scope.setPagename = function(path) { $location.path(path); };
      $scope.getPagename = function() { return $location.path(); }
    }]);
})(window.angular);

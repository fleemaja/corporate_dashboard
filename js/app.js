(function(angular) {
  'use strict';
  angular.module('corporateDashboard', ['ngAnimate'])
    .controller('viewController', ['$scope', function($scope) {
      $scope.items = ['geospatial', 'metrics', 'data'];
      $scope.selection = $scope.items[0];
    }]);
})(window.angular);

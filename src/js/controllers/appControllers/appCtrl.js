(function () {
  'use strict';

  angular.module('corporateDashboard.controllers')
    .controller('appCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.setPagename = function(path) { $location.path(path); };
        $scope.getPagename = function() { return $location.path(); };
        $scope.isActive = function (route) {
            return route === $location.path();
        };
    }])
}());

(function () {
  'use strict';

  angular.module('corporateDashboard.controllers')
    .controller('barCtrl', ['$scope', function($scope){
      $scope.title = "barCtrl";
      $scope.d3Data = [
        {title: "Greg", score:12},
        {title: "Ari", score:43},
        {title: "Loser", score: 87}
      ];
    }])
    .controller('lineCtrl', ['$scope', function($scope){
      $scope.title = "lineCtrl";
      $scope.d3Data = [
        {title: 1, score:0},
        {title: 2, score:43},
        {title: 3, score:87},
        {title: 400, score:333}
      ];
    }]);

}());

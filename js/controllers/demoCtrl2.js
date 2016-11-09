// code from the following tutorial:  https://github.com/EpiphanyMachine/d3AngularIntegration

(function () {
  'use strict';

  angular.module('corporateDashboard.controllers')
    .controller('DemoCtrl2', ['$scope', function($scope){
      $scope.title = "DemoCtrl2";
      $scope.d3Data = [
        {title: "Greg", score:12},
        {title: "Ari", score:43},
        {title: "Loser", score: 87}
      ];
    }]);

}());

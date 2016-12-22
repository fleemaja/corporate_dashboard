(function () {
  'use strict';

  angular.module('corporateDashboard.controllers')
    .controller('openIssuesCtrl', ['$scope', 'openIssuesService', function($scope, openIssuesService) {
      var Issues = openIssuesService.getOpenIssuesData();
      $scope.objects = Issues.query();
      $scope.objects.$promise.then(function(){
        $scope.objs = $scope.objects.filter(function(obj) { return obj.state === 'open'});
        $scope.openNum = $scope.objs.length;
      });
    }])


}());

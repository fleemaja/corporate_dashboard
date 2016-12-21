(function () {
  'use strict';

  angular.module('corporateDashboard.controllers')
    .controller('openIssuesCtrl', ['$scope', '$resource', function($scope, $resource) {
      var Issues = $resource('https://fleemaja.github.io/corporate_dashboard/data/issues.json');
      $scope.objects = Issues.query();
      $scope.objects.$promise.then(function(){
        $scope.objs = $scope.objects.filter(function(obj) { return obj.state === 'open'});
        $scope.openNum = $scope.objs.length;
      });
    }])


}());

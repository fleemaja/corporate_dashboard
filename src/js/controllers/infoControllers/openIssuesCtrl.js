(function () {
  'use strict';

  angular.module('corporateDashboard.controllers')
    .controller('openIssuesCtrl', ['$scope', '$timeout', '$location', 'openIssuesService', function($scope, $timeout, $location, openIssuesService) {
      var Issues = openIssuesService.getOpenIssuesData();

      (function tick() {
        $scope.objects = Issues.query(function(){
            var lp = $location.path();
            if (lp != '/geospatial' && lp != '/data') {
              $timeout(tick, 30000);
            }
        });

        $scope.objects.$promise.then(function(){
          $scope.objs = $scope.objects.filter(function(obj) { return obj.state === 'open'});
          $scope.openNum = $scope.objs.length;
        });

      })();

    }])


}());

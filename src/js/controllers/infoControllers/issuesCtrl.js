(function () {
  'use strict';

  angular.module('corporateDashboard.controllers')
    .controller('issuesCtrl', ['$scope', '$timeout', '$location', 'issuesService', function($scope, $timeout, $location, issuesService) {
      var Issue = issuesService.getIssuesData();

      (function tick() {
        $scope.objects = Issue.query(function(){
            if ($location.path() != '/geospatial') {
              $timeout(tick, 30000);
            }
        });

        $scope.objects.$promise.then(function(){
          $scope.totalItems = $scope.objects.length;
        });
      })();

      $scope.customerName = "Gandalf";
      $scope.customerEmail = "gandalf.grey@gmail.com";
      $scope.sortType     = 'created_at'; // set the default sort type
      $scope.sortReverse  = true;  // set the default sort order
      $scope.searchData   = '';     // set the default search/filter term

      $scope.sort = function(sortType){
        $scope.sortType = sortType;
        $scope.sortReverse = !$scope.sortReverse; //if true make it false and vice versa
      }
    }])

}());

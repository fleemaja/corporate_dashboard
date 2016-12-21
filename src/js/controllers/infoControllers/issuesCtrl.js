(function () {
  'use strict';

  angular.module('corporateDashboard.controllers')
    .controller('issuesCtrl', ['$scope', '$resource', function($scope, $resource) {
      var Issue = $resource('https://fleemaja.github.io/corporate_dashboard/data/issues.json');
      $scope.objects = Issue.query();
      $scope.objects.$promise.then(function(){
        $scope.totalItems = $scope.objects.length;
      });
      $scope.sortType     = 'created_at'; // set the default sort type
      $scope.sortReverse  = true;  // set the default sort order
      $scope.searchData   = '';     // set the default search/filter term

      $scope.sort = function(sortType){
        $scope.sortType = sortType;
        $scope.sortReverse = !$scope.sortReverse; //if true make it false and vice versa
      }
    }])

}());

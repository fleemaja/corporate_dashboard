(function () {
  'use strict';

  angular.module('corporateDashboard.controllers')
    .controller('viewController', ['$scope', '$location', function($scope, $location) {
        $scope.setPagename = function(path) { $location.path(path); };
        $scope.getPagename = function() { return $location.path(); };
        $scope.isActive = function (route) {
            return route === $location.path();
        };
    }])
    .controller('barCtrl', ['$scope', function($scope){
      var BarData = $resource('https://fleemaja.github.io/corporate_dashboard/data/barChart.json');
      $scope.title = "barCtrl";
      $scope.d3Data = BarChart.query();
    }])
    .controller('lineCtrl', ['$scope', function($scope){
      var LineData = $resource('https://fleemaja.github.io/corporate_dashboard/data/lineChart.json');
      $scope.title = "lineCtrl";
      $scope.d3Data = LineData.query();
    }])
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
    .controller('citiesCtrl', ['$scope', '$resource', function($scope, $resource) {
      var City = $resource('https://fleemaja.github.io/corporate_dashboard/data/cities.json');
      $scope.objects = City.query();
    }])
    .controller('MainCtrl', ['$scope', '$http', function($scope, $http){
      $http.get('https://gist.githubusercontent.com/abenrob/787723ca91772591b47e/raw/8a7f176072d508218e120773943b595c998991be/world-50m.json').success(function(data){
        $scope.mapData = data;
        $('.loader').hide();
      }).error(function(err){
        throw err;
      });
    }]);

}());

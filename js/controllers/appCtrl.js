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
    }])
    .controller('issuesCtrl', ['$scope', '$resource', function($scope, $resource) {
      var Issue = $resource('https://api.github.com/repos/angular-ui/bootstrap/issues');
      $scope.objects = Issue.query();
      $scope.objects.$promise.then(function(){
        $scope.totalItems = $scope.objects.length;
      });
      $scope.currentPage = 1;
      $scope.numPerPage = 11;

      $scope.paginate = function(value) {
        var begin, end, index;
        begin = ($scope.currentPage - 1) * $scope.numPerPage;
        end = begin + $scope.numPerPage;
        index = $scope.objects.indexOf(value);
        return (begin <= index && index < end);
      };
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

(function () {
  'use strict';

  angular.module('corporateDashboard.controllers')
  .controller('geospatialCtrl', ['$scope', '$http', function($scope, $http){
    $http.get('https://gist.githubusercontent.com/abenrob/787723ca91772591b47e/raw/8a7f176072d508218e120773943b595c998991be/world-50m.json').success(function(data){
      $scope.mapData = data;
      $('.load-animation').hide();
    }).error(function(err){
      throw err;
    });
  }]);

}());

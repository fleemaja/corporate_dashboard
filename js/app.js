(function(angular) {
  'use strict';
  var corporateDashboard = angular.module('corporateDashboard',
      ['ngAnimate', 'ui.bootstrap', 'ngResource', 'angularUtils.directives.dirPagination',
      'corporateDashboard.controllers', 'corporateDashboard.directives']
    );

  // setup dependency injection
  angular.module('d3', []);
  angular.module('corporateDashboard.controllers', []);
  angular.module('corporateDashboard.directives', ['d3']);

})(window.angular);

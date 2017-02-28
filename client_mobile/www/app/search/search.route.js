(function () {
  'use strict';

  angular
    .module('app.search')
    .config(appConfig);

  /* @ngInject */
  function appConfig($stateProvider) {
    $stateProvider
      .state('app.search', {
        url: "/search",
        views: {
          'menuContent': {
            templateUrl: "app/search/search.html"
          }
        }
      });
  }

  appConfig.$inject = ["$stateProvider"];

}());
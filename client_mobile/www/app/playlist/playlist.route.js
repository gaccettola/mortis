(function () {
  'use strict';

  angular
    .module('app.playlist')
    .config(appConfig);

  /* @ngInject */
  function appConfig($stateProvider) {
    $stateProvider
      .state('app.playlists', {
        url: "/playlists",
        views: {
          'menuContent': {
            templateUrl: "app/playlist/playlists.html",
            controller: 'PlaylistController'
          }
        }
      })

      .state('app.playlist', {
        url: "/playlists/:playlistId",
        views: {
          'menuContent': {
            templateUrl: "app/playlist/playlist.html",
            controller: 'PlaylistController'
          }
        }
      });

  }

  appConfig.$inject = ["$stateProvider"];

}());
(function () {
  'use strict';

  angular
    .module('app.playlist')
    .controller('PlaylistController', PlaylistController);

  /* @ngInject */
  function PlaylistController($scope) {
    $scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
  }
  PlaylistController.$inject = ["$scope"];

}());
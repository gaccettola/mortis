
( function ( )
{
    'use strict';

    //noinspection JSUnresolvedVariable
     angular
        .module ( 'app.layout' )
        .config ( appConfig );

    /* @ngInject */
    function appConfig ( $stateProvider )
    {
        $stateProvider

            .state ( 'app',
            {
                url         : "/app",
                abstract    : true,
                templateUrl : "app/layout/menu.html",
                controller  : 'MenuController'

            } );
    }

    appConfig.$inject = ["$stateProvider"];

} ( ) );


    'use strict';

    var app = angular.module ( 'app' );

    app.config (
        [
            '$stateProvider', '$urlRouterProvider', uiRouteConfig
        ]
    );

    function uiRouteConfig ( $stateProvider, $urlRouterProvider )
    {
        var locationObject = null;

        $urlRouterProvider.otherwise ( function ( $injector, $location )
        {
            $location.path ( 'window_main', false );

        } );

        $stateProvider

            .state ( 'window_main',
            {
                url         : '/window_main',
                templateUrl : 'window_main/window_main.html'
            } )
        ;

    }

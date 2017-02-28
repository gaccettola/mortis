

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
            $location.path ( 'app_info', false );

        } );

        $stateProvider

            .state ( 'app_info',
            {
                url         : '/app_info',
                templateUrl : 'app_info/app_info.html'
            } )
        ;

    }


( function ()
{
    'use strict';

    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    angular
        .module ( 'app.core' )
        .config ( appConfig )
        .run ( appRun );

    /* @ngInject */
    function appRun ( $ionicPlatform )
    {
        $ionicPlatform.ready ( function ( )
        {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)

            //noinspection JSUnresolvedVariable
            if ( window.cordova && window.cordova.plugins.Keyboard )
            {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar ( true );
            }

            if ( window.StatusBar )
            {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

        } );
    }

    appRun.$inject = [ $ionicPlatform ];

    /* @ngInject */
    function appConfig ( $urlRouterProvider )
    {
        $urlRouterProvider.otherwise ( '/app/playlists' )
    }

    appConfig.$inject = [ $urlRouterProvider ];

} ( ) );
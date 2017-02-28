
( function ()
{
    'use strict';

    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    angular
        .module ( 'app.browse' )
        .config ( appConfig );

    /* @ngInject */
    function appConfig ( $stateProvider )
    {
        $stateProvider
            .state ( 'app.browse',
            {
                url   : "/browse",
                views :
                {
                    'menuContent' :
                    {
                        templateUrl : "app/browse/browse.html"
                    }
                }

            } );

    }

    appConfig.$inject = [ "$stateProvider" ];

} ( ) );
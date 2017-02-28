
( function ( )
{
    'use strict';

    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    angular
        .module ( 'blocks.exception' )
        .factory ( 'exception', exception );

    exception.$inject = ['logger'];

    /* @ngInject */
    function exception ( logger )
    {
        var service =
        {
            catcher : catcher
        };

        function catcher ( message )
        {
            return function ( reason )
            {
                logger.error ( message, reason );
            };
        }

        return service;
    }

} )( );

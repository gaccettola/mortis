
( function()
{
    'use strict';

    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    angular
        .module ( 'blocks.logger' )
        .factory ( 'logger', logger );

    logger.$inject = [ '$log' ];

    /* @ngInject */
    function logger ( $log )
    {
        var service =
        {
            showToasts  : true,

            error       : error,
            info        : info,
            success     : success,
            warning     : warning,

            log         : $log.log
        };

        return service;
        /////////////////////

        function error ( message, data, title )
        {
            $log.error ( 'Error: ' + message, data );
        }

        function info ( message, data, title )
        {
            $log.info ( 'Info: ' + message, data );
        }

        function success ( message, data, title )
        {
            $log.info ( 'Success: ' + message, data );
        }

        function warning ( message, data, title )
        {
            $log.warn ( 'Warning: ' + message, data );
        }
    }

}() );

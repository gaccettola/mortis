
( function ()
{
    'use strict';

    var service_id = 'dataframe';

    angular.module ( 'app' )
           .service ( service_id, dataframe );

    dataframe.$inject = [ '$timeout' ];

    function dataframe ( $timeout )
    {
        var vm  = this || {}; // jshint ignore:line

        vm.service =
        {
            listof_module   : [],
            track           : track,
            relay           : relay,
        };

        function track ( service )
        {
            vm.service.listof_module.push ( service );
        }

        function relay ( option, frame )
        {
            return new Promise ( function ( resolve, reject )
            {
                var encoded_frame = Object.keys ( frame ).map ( function ( key )
                {
                    return encodeURIComponent ( key ) + '=' + encodeURIComponent ( frame [ key ] );

                } ).join ( '&' );

                vm.url_base = 'http://localhost:8989/v1/';

                var url_complete = vm.url_base + option.url_part;

                httpinvoke ( url_complete, option.verb,
                {
                    headers :
                    {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    input   : encoded_frame

                },
                function ( error, data, status, header )
                {
                    var retval  =
                    {
                        error   : error,
                        data    : data,
                        status  : status,
                        header  : header
                    };

                    resolve ( retval );

                } );

            } );

        }

        return vm.service;
    }

} ) ();

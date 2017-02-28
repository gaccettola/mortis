
( function ()
{
    'use strict';

    var service_id = 'dataframe_sample_b';

    angular.module ( 'app' )
        .service ( service_id, dataframe_sample_b );

    dataframe_sample_b.$inject = [ '$timeout', 'dataframe' ];

    function dataframe_sample_b ( $timeout, dataframe )
    {
        var vm  = this || {}; // jshint ignore:line

        vm.service =
        {
            name        : service_id,
            relay       : relay,
            subscribe   : subscribe
        };

        if ( ! vm.instanceof_postal )
        {
            vm.instanceof_postal = postal.channel ( service_id );
        }

        function relay ( )
        {
            return new Promise ( function ( resolve, reject )
            {
                var option =
                {
                    url_part : 'sample_b',
                    verb     : 'POST'
                };

                var frame =
                {
                    content  : 'Hello World',
                    comment  : 'initial version'
                };

                dataframe.relay ( option, frame ).then (

                    function ( value )
                    {
                        resolve ( value );

                        $timeout ( function ()
                        {
                            publish ( value );

                        }, 0 );
                    }

                );

            } );

        }

        function subscribe ( message_handler )
        {
            var subscription =
            {
                channel  : service_id,
                topic    : service_id,
                callback : message_handler
            };

            return vm.instanceof_postal.subscribe ( subscription );
        }

        function publish ( message_content )
        {
            var envelope =
            {
                channel  : service_id,
                topic    : service_id,
                data     : message_content
            };

            vm.instanceof_postal.publish ( envelope );
        }

        dataframe.track ( vm.service );

        return vm.service;
    }

} ) ();

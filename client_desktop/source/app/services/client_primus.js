
( function ()
{
    'use strict';

    var service_id = 'client_primus';

    angular.module ( 'app' )
           .service ( service_id, client_primus );

    client_primus.$inject = [ '$timeout' ];

    function client_primus ( $timeout )
    {
        var vm  = this || {}; // jshint ignore:line

        vm.service =
        {
            connect : connect
        };

        vm.client_socket;
        vm.client_socket_url     = 'ws://localhost:8989';
        vm.client_socket_options =
        {
            manual      : true,
            reconnect   :
            {
                max     : Infinity  // Number: The max delay before we try to reconnect.
            ,   min     : 500       // Number: The minimum delay before we try reconnect.
            ,   retries : 10        // Number: How many times we should try to reconnect.
            }
        };

        function connect ( )
        {
            vm.client_socket = new mortis_primus ( vm.client_socket_url, vm.client_socket_options );

            vm.client_socket.on ( 'data', function message ( data )
            {
                console.log ( 'Received a new message from the server', data );

            } );

            vm.client_socket.on ( 'open', function ( )
            {
                console.log ( 'Connection is alive and kicking' );

            } );

            vm.client_socket.on ( 'error', function error ( err )
            {
                console.error ( 'Something horrible has happened', err.stack );

            } );

            vm.client_socket.on ( 'reconnect', function ( opts )
            {
                console.log ( 'Reconnection attempt started' );

            } );

            vm.client_socket.on ( 'reconnect scheduled', function ( opts )
            {
                console.log ( 'Reconnecting in %d ms', opts.scheduled );

                console.log ( 'This is attempt %d out of %d', opts.attempt, opts.retries );

            } );

            vm.client_socket.on ( 'reconnected', function ( opts )
            {
                console.log ( 'It took %d ms to reconnect', opts.duration );

            } );

            vm.client_socket.on ( 'reconnect timeout', function ( err, opts )
            {
                console.log ( 'Timeout expired: %s', err.message );

            } );

            vm.client_socket.on ( 'reconnect failed', function ( err, opts )
            {
                console.log ( 'The reconnection failed: %s', err.message );

            } );

            vm.client_socket.on ( 'end', function ( )
            {
                console.log ( 'Connection closed' );

            } );

            vm.client_socket.on ( 'destroy', function ( )
            {
                console.log ( 'Feel the power of my lasers!' );

            } );

            vm.client_socket.open ( );

        }

        return vm.service;
    }

} ) ();

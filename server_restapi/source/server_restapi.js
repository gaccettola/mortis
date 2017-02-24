
/*jslint node: true */
'use strict';

// ////////////////////////////////////////////////////////////////////////////
//
// system requirements,


var dotenv  = require ( 'dotenv'   ).config(),
    Promise = require ( 'bluebird' ),
    chalk   = require ( 'chalk'    );

    var vm = this || {};

    vm.status = true;

    vm.central_relay = require ( './services/central_relay.js' )( );

    vm.storage_agent = require ( './services/storage_agent.js' )( );
    vm.storage_proxy = require ( './services/storage_proxy.js' )( );

    vm.message_agent = require ( './services/message_agent.js' )( );
    vm.message_proxy = require ( './services/message_proxy.js' )( );

    vm.restapi_agent = require ( './services/restapi_agent.js' )( );
    vm.restapi_proxy = require ( './services/restapi_proxy.js' )( );

    function on_error_during_liftoff ( error )
    {
        if ( true === vm.status )
        {
            vm.status = false;

            vm.reason = error;
        }

        return error;
    }

    vm.central_relay.ctor ( ).then (

        function ( value )
        {
            return vm.storage_agent.ctor ( vm.central_relay );
        },
        function ( error )
        {
            throw on_error_during_liftoff ( error );
        }

    ).then (

        function ( value )
        {
            return vm.storage_proxy.ctor ( vm.central_relay, vm.storage_agent );
        },
        function ( error )
        {
            throw on_error_during_liftoff ( error );
        }

    ).then (

        function ( value )
        {
            return vm.message_agent.ctor ( vm.central_relay, vm.storage_agent );
        },
        function ( error )
        {
            throw on_error_during_liftoff ( error );
        }

    ).then (

        function ( value )
        {
            return vm.message_proxy.ctor ( vm.central_relay, vm.storage_agent, vm.message_agent );
        },
        function ( error )
        {
            throw on_error_during_liftoff ( error );
        }

    ).then (

        function ( value )
        {
            return vm.restapi_agent.ctor ( vm.central_relay, vm.storage_agent );
        },
        function ( error )
        {
            throw on_error_during_liftoff ( error );
        }

    ).then (

        function ( value )
        {
            return vm.restapi_proxy.ctor ( vm.central_relay, vm.storage_agent, vm.restapi_agent );
        },
        function ( error )
        {
            throw on_error_during_liftoff ( error );
        }

    ).catch (

        function ( ex )
        {
            on_error_during_liftoff ( ex );

            console.log ( chalk.red ( 'unable to lift system' ) );
        }

    ).finally (

        function ( )
        {
            if ( true === vm.status )
            {
                console.log ( chalk.green ( 'system online' ) );

            } else
            {
                console.log ( chalk.red ( 'system offline, ', vm.reason ) );
            }

        }

    );
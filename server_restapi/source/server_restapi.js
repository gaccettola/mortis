
/*jslint node: true */
'use strict';

// ////////////////////////////////////////////////////////////////////////////
//
// system requirements,

var dotenv  = require ( 'dotenv'   ).config(),
    Promise = require ( 'bluebird' ),
    chalk   = require ( 'chalk'    );

// ////////////////////////////////////////////////////////////////////////////
//
// common requirements,

var constant_server_restapi = require ( './common/constant_server_restapi' );

// ////////////////////////////////////////////////////////////////////////////
//
// implementation

    var vm = this || {};

    vm.status = true;

    vm.central_relay = require ( './services/central_relay.js' )( );    // in-memory message bus

    vm.storage_agent = require ( './services/storage_agent.js' )( );    // database connection instance
    vm.storage_proxy = require ( './services/storage_proxy.js' )( );    // database connection instance router

    vm.protect_agent = require ( './services/protect_agent.js' )( );    // node-rsa, jsonwebtoken, and crypto

    vm.message_agent = require ( './services/message_agent.js' )( );    // real-time framework instance
    vm.message_proxy = require ( './services/message_proxy.js' )( );    // real-time framework instance router

    vm.restapi_agent = require ( './services/restapi_agent.js' )( );    // express instance
    vm.restapi_proxy = require ( './services/restapi_proxy.js' )( );    // express instance router

    vm.cronjob_agent = require ( './services/cronjob_agent.js' )( );    // cronjob instance

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
            return vm.protect_agent.ctor ( vm.central_relay, vm.storage_agent );
        },
        function ( error )
        {
            throw on_error_during_liftoff ( error );
        }

    ).then (

        function ( value )
        {
            return vm.restapi_agent.ctor (

                vm.central_relay,
                vm.storage_agent,
                vm.protect_agent
            );

        },
        function ( error )
        {
            throw on_error_during_liftoff ( error );
        }

    ).then (

        function ( value )
        {
            return vm.restapi_proxy.ctor (

                vm.central_relay,
                vm.storage_agent,
                vm.protect_agent,
                vm.restapi_agent
            );

        },
        function ( error )
        {
            throw on_error_during_liftoff ( error );
        }

    ).then (

        function ( value )
        {
            return vm.message_agent.ctor (

                vm.central_relay,
                vm.storage_agent,
                vm.restapi_agent
            );

        },
        function ( error )
        {
            throw on_error_during_liftoff ( error );
        }

    ).then (

        function ( value )
        {
            return vm.message_proxy.ctor (

                vm.central_relay,
                vm.storage_agent,
                vm.message_agent
            );

        },
        function ( error )
        {
            throw on_error_during_liftoff ( error );
        }


    ).then (

        function ( value )
        {
            return vm.cronjob_agent.ctor ( vm.central_relay, vm.storage_agent );
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
                vm.central_relay.publish ( constant_server_restapi.restapi_listen,
                {

                } );

            } else
            {
                console.log ( chalk.red ( 'system offline, shutting down', vm.reason ) );

                process.exit ( 0 );
            }

        }

    );
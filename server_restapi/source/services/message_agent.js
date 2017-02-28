
/*jslint node: true */
'use strict';

var dotenv  = require ( 'dotenv'   ).config(),
    Promise = require ( 'bluebird' ),
    chalk   = require ( 'chalk'    ),
    Redis   = require ( 'ioredis'  );

// ////////////////////////////////////////////////////////////////////////////
//
// common requirements,

var constant_server_restapi = require ( '../common/constant_server_restapi' );

// ////////////////////////////////////////////////////////////////////////////
//
// message relay, real-time framework for work with sockets
//
// using primus as an abstration around the real-time framework in use ( uws )

module.exports = function ( )
{
    var vm = this || {};

    vm._service_name = 'message_relay';

    vm.api =
    {
        ctor         : ctor,

        service_name : service_name
    };

    function ctor ( central_relay, storage_agent, restapi_agent )
    {
        return new Promise ( function ( resolve, reject )
        {
            var retval = false;

            // ////////////////////////////////////////////////////////////////
            //
            // framework resources

            vm.central_relay = central_relay;
            vm.storage_agent = storage_agent;
            vm.restapi_agent = restapi_agent;

            // ////////////////////////////////////////////////////////////////
            //
            // instance setup

            service_init ( ).then (

                function ( value )
                {
                },
                function ( error )
                {
                    throw ( error )
                }

            ).catch (

                function ( ex )
                {
                    console.log ( chalk.green ( '!!! ERROR : Unable to load -', vm._service_name ) );
                }

            ).finally (

                function ( )
                {

                    // ////////////////////////////////////////////////////////////////
                    //
                    // subscriptions

                    vm.central_relay.subscribe ( constant_server_restapi.restapi_listening,
                                                 on_central_relay_restapi_listening );

                    // ////////////////////////////////////////////////////////////////

                    console.log ( chalk.green ( 'on the line :', service_name ( ) ) );

                    retval = true;

                    resolve ( retval );

                }

            );

        } );

    }

    function service_name ( )
    {
        return vm._service_name;
    }

    function service_init ( )
    {
        return new Promise ( function ( resolve, reject )
        {
            vm.redis = new Redis (
            {
                port        : process.env.RD_SERVER_PORT,   // Redis port
                host        : process.env.RD_SERVER_HOST,   // Redis host
                family      : process.env.RD_SERVER_FAMILY, // 4 (IPv4) or 6 (IPv6)
                password    : process.env.RD_SERVER_AUTH,
                db          : process.env.RD_SERVER_DATA,

            } );

            resolve ( vm.redis );

        } );

    }

    function on_central_relay_restapi_listening ( data, envelope )
    {
        console.log ( chalk.green ( 'starting message agent' ) );

        var http_server = vm.restapi_agent.http_server_get ( );

    }

    return vm.api;
};

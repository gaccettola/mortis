
/*jslint node: true */
'use strict';

var dotenv  = require ( 'dotenv'   ).config(),
    Promise = require ( 'bluebird' ),
    chalk   = require ( 'chalk'    );

module.exports = function ( )
{
    var vm = this || {};

    vm._service_name = 'sample_b';

    var api =
    {
        ctor         : ctor
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

            console.log ( chalk.green ( 'on the line :', service_name ( ) ) );

            // ////////////////////////////////////////////////////////////////
            //
            // instance setup

            service_init ( ).then (

                function ( value )
                {

                },
                function ( error )
                {
                    throw ( error );
                }

            ).catch (

                function ( ex )
                {

                }

            ).finally (

                function ( )
                {
                    // ////////////////////////////////////////////////////////////////
                    //
                    // subscriptions
                    //
                    // { none }

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
            var express = vm.restapi_agent.express_get ();

            express.post ( '/v1/' + vm._service_name, on_restapi_post );
            express.get  ( '/v1/' + vm._service_name, on_restapi_get  );

            resolve ( true );

        } );
    }

    function on_restapi_post ( req, res, next )
    {
        var thing = new Date ( );

        return res.status( 200 ).send (
        {
            status_code : 200,
            result      : thing.toISOString()

        } );

    }

    function on_restapi_get ( req, res, next )
    {
        var thing = new Date ( );

        return res.status( 200 ).send (
        {
            status_code : 200,
            result      : thing.toISOString()

        } );

    }

    return api;

};
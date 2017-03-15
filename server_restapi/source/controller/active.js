
/*jslint node: true */
'use strict';

var dotenv  = require ( 'dotenv'   ).config(),
    Promise = require ( 'bluebird' ),
    sprintf = require ( 'sprintf'  ),
    mysql   = require ( 'mysql'    ),
    chalk   = require ( 'chalk'    );

module.exports = function ( )
{
    var vm = this || {};

    vm._service_name = 'active';

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

            resolve ( true );

        } );
    }

    function sp_exec ( req, res, next, script )
    {
        var thing = new Date ( );

        vm.storage_agent.connection_exec ( script ).then (

            function ( value )
            {
                return res.status( 200 ).send (
                {
                    status_code : 200,
                    result      : value

                } );
            },
            function ( error )
            {
                throw ( error );
            }

        ).catch (

            function ( error )
            {
                return res.status( 400 ).send (
                {
                    status_code : 400,
                    result      : error

                } );
            }

        );
    }

    function fetch ( req, res, next )
    {
        var sp_script = sprintf ( 'CALL %s( %s );',
            'sp_active_fetch',
            mysql.escape ( req.body.activeId )
        );

        return sp_exec ( req, res, next, sp_script );
    }

    function patch ( req, res, next )
    {
        var sp_script = sprintf ( 'CALL %s( %s, %s, %s );',
            'sp_active_patch',
            mysql.escape ( req.body.activeId ),
            mysql.escape ( req.body.userId ),
            mysql.escape ( req.body.businessId )
        );

        return sp_exec ( req, res, next, sp_script );
    }

    function write ( req, res, next )
    {
        var sp_script = sprintf ( 'CALL %s( %s, %s );',
            'sp_active_write',
            mysql.escape ( req.body.userId ),
            mysql.escape ( req.body.businessId )
        );

        return sp_exec ( req, res, next, sp_script );
    }

    function on_restapi_post ( req, res, next )
    {
        if ( req.body.fetch ) return fetch ( req, res, next );

        if ( req.body.patch ) return patch ( req, res, next );

        if ( req.body.write ) return write ( req, res, next );

        var thing = new Date ( );
        return res.status( 200 ).send (
        {
            status_code : 200,
            result      : thing.toISOString()

        } );

    }

    return api;

};
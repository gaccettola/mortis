
/*jslint node: true */
'use strict';

var dotenv  = require ( 'dotenv'   ).config(),
    Promise = require ( 'bluebird' ),
    _       = require ( 'lodash'   ),
    sprintf = require ( 'sprintf'  ),
    mysql   = require ( 'mysql'    ),
    chalk   = require ( 'chalk'    );

// ////////////////////////////////////////////////////////////////////////////
//
// common requirements,

var constant_server_restapi = require ( '../common/constant_server_restapi' );

module.exports = function ( )
{
    var vm = this || {};

    var api =
    {
        bind_ctor           : bind_ctor,

        request_status_send : request_status_send,

        sp_exec_all         : sp_exec_all,
        sp_exec_one         : sp_exec_one,

        sp_exec             : sp_exec
    };

    function bind_ctor ( instance, fx_service_init, fx_service_name,
                         central_relay, storage_agent, protect_agent, restapi_agent )
    {
        return new Promise ( function ( resolve, reject )
        {
            var retval = false;

            // ////////////////////////////////////////////////////////////////
            //
            // framework resources

            instance.central_relay = central_relay;
            instance.storage_agent = storage_agent;
            instance.protect_agent = protect_agent;
            instance.restapi_agent = restapi_agent;

            console.log ( chalk.green ( 'on the line :', fx_service_name ( ) ) );

            // ////////////////////////////////////////////////////////////////
            //
            // instance setup

            fx_service_init ( ).then (

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

    function request_status_send ( res, _status_code, _result )
    {
        return res.status ( _status_code ).send (
        {
            status_code : _status_code,
            result      : _result

        } );
    }

    function sp_exec_all ( req, res, next, instance, script )
    {
        instance.storage_agent.connection_exec ( script ).then (

            function ( value )
            {
                return request_status_send ( res, 200, value[0] );
            },
            function ( error )
            {
                throw ( error );
            }

        ).catch (

            function ( error )
            {
                return request_status_send ( res, 400, error );
            }

        );
    }

    function sp_exec_one ( req, res, next, instance, script )
    {
        instance.storage_agent.connection_exec ( script ).then (

            function ( value )
            {
                return request_status_send ( res, 200, value[0][0] );
            },
            function ( error )
            {
                throw ( error );
            }

        ).catch (

            function ( error )
            {
                return request_status_send ( res, 400, error );
            }

        );
    }

    function sp_exec ( req, res, next, instance, script )
    {
        instance.storage_agent.connection_exec ( script ).then (

            function ( value )
            {
                return request_status_send ( res, 200, value );
            },
            function ( error )
            {
                throw ( error );
            }

        ).catch (

            function ( error )
            {
                return request_status_send ( res, 400, error );
            }

        );
    }

    return api;

};
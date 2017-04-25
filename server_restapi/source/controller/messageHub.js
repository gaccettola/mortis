
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

var _controllerBase         = require ( './_controllerBase' )();

module.exports = function ( )
{
    var vm = this || {};

    vm._service_name = 'messageHub';

    var api =
    {
        ctor         : ctor
    };

    function ctor ( central_relay, storage_agent, protect_agent, restapi_agent )
    {
        return _controllerBase.bind_ctor (

            vm, service_init, service_name, central_relay,
            storage_agent, protect_agent, restapi_agent

        );

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

    function write ( req, res, next )
    {
        var client = require ( 'twilio' ) (

            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );

        client.messages.create (
            {
                from    : process.env.TWILIO_PHONE_NUMBER,
                to      : req.body.messageTo,
                body    : req.body.messageBody

            },
            function ( err, message )
            {
                if ( err )
                {
                    return _controllerBase.request_status_send (

                        res,
                        400,
                        { error : 'bad request' }

                    );
                }

                console.log ( '!!! RESULT : _dataframeMessageHub.on_toolbar_send -', message );

                return _controllerBase.request_status_send (

                    res,
                    200,
                    { error : 'woohoo' }

                );
            }
        );
    }

    function history ( req, res, next )
    {
        var client = require ( 'twilio' ) (

            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );

        var retval = [];

        client.messages.list ( function ( err, data )
        {
            if ( data && data.messages )
            {
                data.messages.forEach ( function ( message )
                {
                    if ( req.body.messageTo === message.to )
                    {
                        retval.push ( message );

                    } else
                    if ( req.body.messageTo === message.from )
                    {
                        retval.push ( message );
                    }

                } );

                _controllerBase.request_status_send ( res, 200, retval );

            } else
            {
                _controllerBase.request_status_send ( res, 400, retval );
            }

        } );

    }

    function posted ( req, res, next )
    {
        console.log ( 'messageHub.posted' );

        vm.central_relay.publish ( constant_server_restapi.twilio_posted,
        {
        } );

        _controllerBase.request_status_send ( res, 200, 'ok' );
    }

    function on_restapi_post ( req, res, next )
    {
        if ( req.body.write ) return write ( req, res, next );

        if ( req.body.history ) return history ( req, res, next );

        if ( req.body.posted ) return posted ( req, res, next );

        return _controllerBase.request_status_send ( res, 400, { error : 'bad request' } );
    }

    return api;

};
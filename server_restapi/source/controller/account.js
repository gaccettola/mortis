
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

    vm._service_name = 'account';

    var api =
    {
        ctor         : ctor
    };

    function ctor ( central_relay, storage_agent, protect_agent, restapi_agent )
    {
        return new Promise ( function ( resolve, reject )
        {
            var retval = false;

            // ////////////////////////////////////////////////////////////////
            //
            // framework resources

            vm.central_relay = central_relay;
            vm.storage_agent = storage_agent;
            vm.protect_agent = protect_agent;
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

    function request_status_send ( res, _status_code, _result )
    {
        return res.status ( _status_code ).send (
        {
            status_code : _status_code,
            result      : _result

        } );
    }

    function sp_exec ( req, res, next, script )
    {
        vm.storage_agent.connection_exec ( script ).then (

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

    /**
     *
     * @param req.body.accountId
     */
    function fetch ( req, res, next )
    {
        var sp_script = sprintf ( 'CALL %s( %s );',
            'sp_account_fetch',
            mysql.escape ( req.body.accountId )
        );

        return sp_exec ( req, res, next, sp_script );
    }

    /**
     *
     * @param req.body.accountId
     * @param req.body.userName
     * @param req.body.salt
     * @param req.body.hash
     */
    function patch ( req, res, next )
    {
        var sp_script = sprintf ( 'CALL %s( %s, %s, %s, %s );',
            'sp_account_patch',
            mysql.escape ( req.body.accountId ),
            mysql.escape ( req.body.userName ),
            mysql.escape ( req.body.salt ),
            mysql.escape ( req.body.hash )
        );

        return sp_exec ( req, res, next, sp_script );
    }

    /**
     *
     * @param req.body.userName
     * @param req.body.password
     */
    function write ( req, res, next )
    {
        var account_salt = vm.protect_agent.compose_salt ( );
        var account_hash = vm.protect_agent.encrypt_pass ( req.body.password, account_salt );
        var sp_script;

        sp_script = sprintf ( 'CALL %s( %s );',
            'sp_account_fetch_user',
            mysql.escape ( req.body.userName )
        );

        vm.storage_agent.connection_exec ( sp_script ).then (

            function ( value )
            {
                var result_len  = value[0].length;

                if ( 0 < result_len )
                {
                    return value;

                } else
                {
                    sp_script = sprintf ( 'CALL %s( %s, %s, %s );',
                        'sp_account_write',
                        mysql.escape ( req.body.userName ),
                        mysql.escape ( account_salt ),
                        mysql.escape ( account_hash )
                    );

                    return vm.storage_agent.connection_exec ( sp_script );
                }

            },
            function ( error )
            {
                throw ( error );
            }

        ).then (

            function ( value )
            {
                var retval = _.omit ( value[0][0],
                [
                    'accountId',
                    'salt',
                    'hash'

                ] );

                return request_status_send ( res, 200, retval );
            },
            function ( error )
            {
                return request_status_send ( res, 400, error );
            }

        );

    }

    function accountToken_verify ( token )
    {
        return new Promise ( function ( resolve, reject )
        {
            var retval   = vm.protect_agent.token_verify ( token );

            resolve ( retval );

        } );
    }

    function accountToken_write ( fetch_user_result )
    {
        return new Promise ( function ( resolve, reject )
        {
            var payload     =
            {
                userName    : fetch_user_result.userName
            };

            var jwt_token   = vm.protect_agent.token_sign ( payload );

            var sp_script = sprintf ( 'CALL %s( %s, %s );',
                'sp_accountToken_write',
                mysql.escape ( fetch_user_result.accountId ),
                mysql.escape ( jwt_token )
            );

            vm.storage_agent.connection_exec ( sp_script ).then (

                function ( value )
                {
                    resolve ( value[0][0] );
                },
                function ( error )
                {
                    throw ( error );
                }

            ).catch (

                function ( ex )
                {
                    reject ( ex );
                }

            );

        } );

    }

    function accountToken_fetch_account ( fetch_user_result )
    {
        return new Promise ( function ( resolve, reject )
        {
            var sp_script = sprintf ( 'CALL %s( %s );',
                'sp_accountToken_fetch_account',
                mysql.escape ( fetch_user_result.accountId )
            );

            vm.storage_agent.connection_exec ( sp_script ).then (

                function ( value )
                {
                    var result_len  = value[0].length;

                    if ( 1 > result_len )
                    {
                        throw ( 'account token not found' );
                    }

                    resolve ( value[0][0] );

                },
                function ( error )
                {
                    throw ( error );
                }

            ).catch (

                function ( ex )
                {
                    reject ( ex );
                }

            );

        } );

    }

    /**
     * Login with userName & password
     * @param req.body.userName
     * @param req.body.password
     */
    function login ( req, res, next )
    {
        var account_salt = vm.protect_agent.compose_salt ( );
        var account_hash = vm.protect_agent.encrypt_pass ( req.body.password, account_salt );

        var sp_script = sprintf ( 'CALL %s( %s );',
            'sp_account_fetch_user',
            mysql.escape ( req.body.userName )
        );

        var fetch_user_result;

        vm.storage_agent.connection_exec ( sp_script ).then (

            function ( value )
            {
                var result_len = value[0].length;

                if ( 1 > result_len )
                {
                    throw ( 'account not found' );
                }

                fetch_user_result = value[0][0];

                fetch_user_result.confirmed = vm.protect_agent.confirm_hash (

                    req.body.password,
                    fetch_user_result.salt,
                    fetch_user_result.hash

                );

                if ( true !== fetch_user_result.confirmed )
                {
                    throw ( 'try again' );
                }

                return accountToken_fetch_account ( fetch_user_result );
            },
            function ( error )
            {
                throw ( error );
            }

        ).then (

            function ( value )
            {
                // account already has an accountToken, return it.

                return value;
            },
            function ( error )
            {
                // no account token, make a token. return it

                return accountToken_write ( fetch_user_result );
            }

        ).then (

            function ( value )
            {
                var retval      =
                {
                    userName    : req.body.userName,
                    success     : fetch_user_result.confirmed,
                    token       : value.token
                };

                return request_status_send ( res, 200, retval );
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

    /**
     * Login with userName & password
     * @param req.body.userName
     * @param req.body.token
     */
    function check ( req, res, next )
    {
        if ( ! req.body.userName )
        {
            return request_status_send ( res, 400, 'no' );
        }

        if ( ! req.body.token )
        {
            return request_status_send ( res, 400, 'no' );
        }

        console.log ( vm._service_name, `::check`, req.body.userName );
        console.log ( vm._service_name, `::check`, req.body.token );

        accountToken_verify ( req.body.token ).then (

            function ( value )
            {
                return request_status_send ( res, 200, 'ok' );
            },
            function ( error )
            {
                throw ( error );
            }

        ).catch (

            function ( ex )
            {
                return request_status_send ( res, 400, 'no' );
            }

        );

    }

    function on_restapi_post ( req, res, next )
    {
        if ( req.body.fetch ) return fetch ( req, res, next );

        if ( req.body.patch ) return patch ( req, res, next );

        if ( req.body.write ) return write ( req, res, next );

        if ( req.body.login ) return login ( req, res, next );

        if ( req.body.check ) return check ( req, res, next );

        return request_status_send ( res, 400, { error : 'bad request' } );
    }

    return api;

};
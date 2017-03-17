
/*jslint node: true */
'use strict';

// ////////////////////////////////////////////////////////////////////////////
//
// system requirements,

var dotenv      = require ( 'dotenv'            ).config(),
    Promise     = require ( 'bluebird'          ),
    path        = require ( 'path'              ),
    fs          = require ( 'fs'                ),
    NodeRSA     = require ( 'node-rsa'          ),
    jwt         = require ( 'jsonwebtoken'      ),
    crypto      = require ( 'crypto'      ),
    sprintf     = require ( 'sprintf'           ),
    mysql       = require ( 'mysql'             ),
    chalk       = require ( 'chalk'             );

// ////////////////////////////////////////////////////////////////////////////
//
// common requirements,

var constant_server_restapi = require ( '../common/constant_server_restapi' );

// ////////////////////////////////////////////////////////////////////////////
//
// protect_agent, node-rsa, jsonwebtoken, and crypto
//
//

module.exports = function ( )
{
    var vm = this || {};

    vm._service_name = 'protect_agent';

    vm.api =
    {
        ctor            : ctor,

        compose_salt    : compose_salt,
        encrypt_pass    : encrypt_pass,
        confirm_hash    : confirm_hash,
        token_sign      : token_sign,
        token_verify    : token_verify
    };

    vm.token_dir        = __dirname;
    vm.token_pubkey     = path.join ( vm.token_dir, process.env.RSA_PUB );
    vm.token_prikey     = path.join ( vm.token_dir, process.env.RSA_PRI );

    vm.public_key       = null;
    vm.private_key      = null;
    vm.key              = null;

    function ctor ( central_relay, storage_agent )
    {
        return new Promise ( function ( resolve, reject )
        {
            var retval = false;

            // ////////////////////////////////////////////////////////////////
            //
            // framework resources

            vm.central_relay = central_relay;
            vm.storage_agent = storage_agent;

            // ////////////////////////////////////////////////////////////////
            //
            // instance setup

            service_init ( ).finally (

                function ( )
                {
                    console.log ( chalk.green ( 'on the line :', service_name ( ) ) );

                    retval = true;

                    resolve ( retval );

                }

            );

        } );

    }

    function service_init ( )
    {
        return new Promise ( function ( resolve, reject )
        {
            var retval      = false;
            var tokenName   = 'system_jwt';

            token_fetch_name ( tokenName ).then (

                function ( value )
                {
                    var result_len = value[0].length;

                    if ( 0 === result_len )
                    {
                        token_build ( );

                        return token_write ( tokenName, vm.public_key, vm.private_key );

                    } else
                    {
                        return value;
                    }

                },
                function ( error )
                {
                    throw ( error );
                }

            ).then (

                function ( value )
                {
                    vm.public_key   = null;
                    vm.private_key  = null;
                    vm.key          = null;

                    vm.public_key   = value[0][0].publicKey;
                    vm.private_key  = value[0][0].privateKey;
                    vm.key          = new NodeRSA ( vm.private_key );

                    retval          = true;
                },
                function ( error )
                {
                    throw ( error );
                }

            ).catch (

                function ( ex )
                {
                    reject ( retval );
                }

            ).finally (

                function ( )
                {
                    resolve ( retval );
                }

            );

        } );

    }

    // returns some random bytes used to `salt` a password,
    // only this salt and an encrypted password ( see the function below )
    // are stored in the database

    function compose_salt ( )
    {
        // storage note, seems to result in length 344

        return crypto.randomBytes( 256 ).toString( 'base64' );
    }

    function encrypt_pass ( password, salt )
    {
        // storage note, seems to result in length 684

        var retval = '';

        // 100,000 ~ 2.0s
        // 50,000  ~ 1.0s
        // 25,000  ~ 0.5s
        // 10,000  ~ 0.2s

        retval = crypto
            .pbkdf2Sync( password, salt, 10000, 512, 'sha512' )
            .toString( 'base64' );

        return retval;
    }

    function confirm_hash ( password, salt, password_hash )
    {
        var retval = false;

        if ( encrypt_pass ( password, salt ) === password_hash )
        {
            retval = true;
        }

        return retval;
    }

    function token_build ( )
    {
        var retVal = false;

        vm.key = new NodeRSA ( { b : 512, e : 5 } );

        vm.key.setOptions (
        {
            encryptionScheme    :
            {
                scheme          : 'pkcs1',
                label           : 'Optimization-Service'
            },
            signingScheme       :
            {
                saltLength      : 25
            }

        } );

        vm.public_key  = vm.key.exportKey ( 'pkcs8-public-pem'  );
        vm.private_key = vm.key.exportKey ( 'pkcs1-private-pem' );

        retVal = true;

        return retVal;
    }

    function token_sign ( token_payload )
    {
        var retval = null;

        try
        {
            retval = jwt.sign (
                token_payload,
                vm.private_key,
                {
                    algorithm   : 'RS256',
                    expiresIn   : '4d'
                }
            );

        } catch ( e )
        {
            console.log ( e );
        }

        return retval;
    }

    function token_verify ( token )
    {
        var retval = null;

        try
        {
            retval = jwt.verify (
                token,
                vm.public_key,
                {
                    algorithm   : 'RS256'
                }
            );

        }
        catch ( e )
        {
            console.log ( e );
        }

        return retval;
    }

    function service_name ( )
    {
        return vm._service_name;
    }

    function sp_exec ( script )
    {
        return new Promise ( function ( resolve, reject )
        {
            vm.storage_agent.connection_exec ( script ).then (

                function ( value )
                {
                    resolve ( value );
                },
                function ( error )
                {
                    throw ( error );
                }

            ).catch (

                function ( error )
                {
                    reject ( error );
                }

            );

        } );

    }

    function token_fetch ( tokenId )
    {
        var sp_script = sprintf ( 'CALL %s( %s );',
            'sp_token_fetch',
            mysql.escape ( tokenId )
        );

        return sp_exec ( sp_script );
    }

    function token_fetch_name ( tokenName )
    {
        var sp_script = sprintf ( 'CALL %s( %s );',
            'sp_token_fetch_name',
            mysql.escape ( tokenName )
        );

        return sp_exec ( sp_script );
    }

    function token_patch ( tokenId, tokenName, publicKey, privateKey )
    {
        var sp_script = sprintf ( 'CALL %s( %s, %s, %s, %s );',
            'sp_token_patch',
            mysql.escape ( tokenId ),
            mysql.escape ( tokenName ),
            mysql.escape ( publicKey ),
            mysql.escape ( privateKey )
        );

        return sp_exec ( sp_script );
    }

    function token_write ( tokenName, publicKey, privateKey )
    {
        var sp_script = sprintf ( 'CALL %s( %s, %s, %s );',
            'sp_token_write',
            mysql.escape ( tokenName ),
            mysql.escape ( publicKey ),
            mysql.escape ( privateKey )
        );

        return sp_exec ( sp_script );
    }

    return vm.api;

};


/*jslint node: true */
'use strict';

// ////////////////////////////////////////////////////////////////////////////
//
// system requirements,

var dotenv      = require ( 'dotenv'        ).config(),
    Promise     = require ( 'bluebird'      ),
    path        = require ( 'path'          ),
    fs          = require ( 'fs'            ),
    NodeRSA     = require ( 'node-rsa'      ),
    jwt         = require ( 'jsonwebtoken'  ),
    chalk       = require ( 'chalk'         );

// ////////////////////////////////////////////////////////////////////////////
//
// common requirements,

var constant_server_restapi = require ( '../common/constant_server_restapi' );

// ////////////////////////////////////////////////////////////////////////////
//
// storage_agent, database connection pool
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

        key_write       : key_write,
        key_read        : key_read,

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
            var retval = false;

            if ( ! fs.existsSync ( vm.token_pubkey ) )
            {
                key_write ( );
            }

            retval = key_read ( );

            resolve ( retval );

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

        retval = crypto.pbkdf2Sync( password, salt, 100000, 512, 'sha512' ).toString( 'base64' );

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

    function key_write ( )
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

        fs.writeFileSync( vm.token_pubkey, vm.public_key );
        fs.writeFileSync( vm.token_prikey, vm.private_key );

        retVal = true;

        return retVal;
    }

    function key_read ( )
    {
        var retVal = false;

        if ( ! fs.existsSync ( vm.token_pubkey ) )
        {
            return retVal;
        }

        if ( ! fs.existsSync ( vm.token_prikey ) )
        {
            return retVal;
        }

        vm.public_key  = fs.readFileSync ( vm.token_pubkey, 'utf8' );
        vm.private_key = fs.readFileSync ( vm.token_prikey, 'utf8' );
        vm.key         = new NodeRSA ( vm.private_key );

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

    return vm.api;

};

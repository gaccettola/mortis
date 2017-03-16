
/*jslint node: true */
'use strict';

// ////////////////////////////////////////////////////////////////////////////
//
// system requirements,

var dotenv      = require ( 'dotenv'            ).config(),
    chalk       = require ( 'chalk'             ),
    crypto      = require ( 'crypto'            ),
    sprintf     = require ( 'sprintf'           );

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

    vm.api =
    {
        compose_salt : compose_salt,
        encrypt_pass : encrypt_pass,
        confirm_hash : confirm_hash
    };

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

    return vm.api;

};
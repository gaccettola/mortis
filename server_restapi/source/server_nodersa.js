
/*jslint node: true */
'use strict';

// ////////////////////////////////////////////////////////////////////////////
//
// system requirements,

var dotenv  = require ( 'dotenv'        ).config(),
    Promise = require ( 'bluebird'      ),
    path    = require ( 'path'          ),
    fs      = require ( 'fs'            ),
    NodeRSA = require ( 'node-rsa'      ),
    jwt     = require ( 'jsonwebtoken'  ),
    chalk   = require ( 'chalk'         );

// ////////////////////////////////////////////////////////////////////////////
//
// implementation

    var vm              = this || {};

    var token_dir       = __dirname;
    var token_pubkey    = path.join ( token_dir, process.env.RSA_PUB );
    var token_prikey    = path.join ( token_dir, process.env.RSA_PRI );

    var public_key;
    var private_key;
    var key;

    function write_key ( )
    {
        var retVal = false;

        var key = new NodeRSA ( { b : 512, e : 5 } );

        key.setOptions (
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

        var public_key  = key.exportKey ( 'pkcs8-public-pem'  );
        var private_key = key.exportKey ( 'pkcs1-private-pem' );

        fs.writeFileSync( token_pubkey, public_key );
        fs.writeFileSync( token_prikey, private_key );

        retVal = true;

        return retVal;
    }

    function read_key  ( )
    {
        var retVal = false;

        if ( ! fs.existsSync ( token_pubkey ) )
        {
            return retVal;
        }

        if ( ! fs.existsSync ( token_prikey ) )
        {
            return retVal;
        }

        public_key  = fs.readFileSync ( token_pubkey, 'utf8' );
        private_key = fs.readFileSync ( token_prikey, 'utf8' );
        key         = new NodeRSA ( private_key );

        retVal = true;

        return retVal;
    }

    if ( ! fs.existsSync ( token_pubkey ) )
    {
        write_key ( );
    }

    if ( ! read_key ( ) )
    {
        console.log ( 'fail' );
    }

    var token;
    var token_payload =
    {
        foo : 'bar'
    };

    try
    {
        token = jwt.sign (
            token_payload,
            private_key,
            {
                algorithm   : 'RS256',
                expiresIn   : '4d'
            }
        );

        console.log ( 'woohoo' );

    } catch ( e )
    {
        console.log ( e );
    }

    var decoded;
    try
    {
        decoded = jwt.verify (
            token,
            public_key,
            {
                algorithm   : 'RS256'
            }
        );

        console.log ( 'woohoo, electric boogaloo' );
    }
    catch ( e )
    {
        console.log ( e );
    }

    if ( token_payload.foo === decoded.foo )
    {
        console.log ( 'woohoo, electric boogaloo - the revenge' );

    } else
    {
        console.log ( 'CHAD !!' );
    }

    console.log ( 'done' );
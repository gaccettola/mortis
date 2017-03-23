
/*jslint node: true */
'use strict';

var assert      = require( 'assert'     ),
    expect      = require( 'chai'       ).expect,
    path        = require( 'path'       ),
    sprintf     = require( 'sprintf'    ),
    _           = require( 'lodash'     ),
    httpinvoke  = require( 'httpinvoke' ),
    Promise     = require( 'bluebird'   );

var server_root = '../../../server_restapi/source/';

function require_relative ( module_path )
{
    return require ( path.join ( server_root, module_path ) );
}

var constant_server_restapi = require_relative ( 'common/constant_server_restapi' );

describe ( 'check server_restapi constants, ensure mocha is online', function ( )
{
    it ( 'should return restapi_listen', function ( done )
    {
        const result = constant_server_restapi.restapi_listen;

        expect ( result ).to.equal ( 'restapi_listen' );

        done ( );

    } );

    it ( 'should return restapi_listening', function ( done )
    {
        const result = constant_server_restapi.restapi_listening;

        expect ( result ).to.equal ( 'restapi_listening' );

        done ( );

    } );

    it ( 'should return scheduled_minute', function ( done )
    {
        const result = constant_server_restapi.scheduled_minute;

        expect ( result ).to.equal ( 'scheduled_minute' );

        done ( );

    } );

} );
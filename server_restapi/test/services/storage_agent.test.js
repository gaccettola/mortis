
/*jslint node: true */
'use strict';

var dotenv      = require ( 'dotenv'     ).config(),
    assert      = require ( 'assert'     ),
    expect      = require ( 'chai'       ).expect,
    path        = require ( 'path'       ),
    sprintf     = require ( 'sprintf'    ),
    Promise     = require ( 'bluebird'   );

var server_root = '../../../server_restapi/source/';

function require_relative ( module_path )
{
    return require ( path.join ( server_root, module_path ) );
}

var services_storage_agent = require_relative ( 'services/storage_agent' )( );
var services_storage_proxy = require_relative ( 'services/storage_proxy' )( );

function sp_exec ( agent, script )
{
    return new Promise ( function ( resolve, reject )
    {
        agent.connection_exec ( script ).then (

            function ( value )
            {
                resolve ( value );
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

describe ( 'system check', function ( )
{
    before ( function ( done )
    {
        services_storage_agent.ctor ( null ).then (

            function ( value )
            {
                return services_storage_proxy.ctor ( null, services_storage_agent );
            },
            function ( error )
            {
                throw ( error );
            }

        ).then (

            function ( value )
            {
                done ( );
            },
            function ( error )
            {
                throw ( error );
            }

        ).catch (

            function ( ex )
            {
                done (ex );
            }

        );

    } );

    it ( 'should verify that 1 equals 1', function ( done )
    {
        var script = 'SELECT 1 AS retval';

        sp_exec ( services_storage_agent, script ).then (

            function ( value )
            {
                expect ( value ).to.have.property ( 'length' );
                expect ( value.length ).to.equal ( 1 );

                var result = value[0];

                expect ( result ).to.have.property ( 'retval' );
                expect ( result.retval ).to.equal ( 1 );

                done ( );
            },
            function ( error )
            {
                done ( error );
            }

        );

    } );

} );
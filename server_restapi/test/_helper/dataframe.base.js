
/*jslint node: true */
'use strict';

var dotenv      = require ( 'dotenv'     ).config(),
    assert      = require ( 'assert'     ),
    expect      = require ( 'chai'       ).expect,
    path        = require ( 'path'       ),
    Promise     = require ( 'bluebird'   ),
    _           = require ( 'lodash'     ),
    sprintf     = require ( 'sprintf'    ),
    mysql       = require ( 'mysql'      ),
    httpinvoke  = require ( 'httpinvoke' ),
    chalk       = require ( 'chalk'      );

var url_base    = 'http://localhost:8989/v1/';

var server_root = '../../../server_restapi/source/';

function require_relative ( module_path )
{
    return require ( path.join ( server_root, module_path ) );
}

var services_storage_agent  = require_relative ( 'services/storage_agent' )( );
var services_storage_proxy  = require_relative ( 'services/storage_proxy' )( );

module.exports = function ( )
{
    var vm = this || {};

    vm._service_name = 'dataframe.base';

    var api =
    {
        invoke_frame : invoke_frame,
        sp_exec      : sp_exec
    };

    /**
     *
     * @param frame
     * @param option.url_part
     * @param option.verb
     */
    function invoke_frame ( frame, option )
    {
        return new Promise ( function ( resolve, reject )
        {
            var encoded_frame = Object.keys ( frame ).map ( function ( key )
            {
                return encodeURIComponent ( key ) + '=' + encodeURIComponent ( frame [ key ] );

            } ).join ( '&' );

            var url_complete = url_base + option.url_part;

            httpinvoke ( url_complete, option.verb,
                {
                    headers :
                        {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                    input   : encoded_frame

                },
                function ( error, data, status, header )
                {
                    var retval  =
                        {
                            error   : error,
                            data    : data,
                            status  : status,
                            header  : header
                        };

                    if ( retval && 200 === retval.status )
                    {
                        resolve ( retval );

                    } else
                    {
                        reject ( retval );
                    }

                } );

        } );
    }

    function sp_exec ( script )
    {
        return new Promise ( function ( resolve, reject )
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
                    return services_storage_agent.connection_exec ( script );
                },
                function ( error )
                {
                    throw ( error );
                }

            ).then (

                function ( value )
                {
                    expect ( value ).to.have.property ( 'length' );
                    expect ( value.length ).to.equal ( 2 );

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

    return api;

};
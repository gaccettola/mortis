
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

var dataframe   = require ( '../_helper/dataframe.base' )();

describe ( 'httpinvoke - account', function ( )
{
    it ( 'write - create a new account', function ( done )
    {
        var frame   =
        {
            write       : true,
            userName    : 'user@domain.com',
            password    : 'secret password'
        };

        var option  =
        {
            url_part    : 'account',
            verb        : 'POST'
        };

        dataframe.invoke_frame ( frame, option ).then (

            function ( value )
            {
                done ( );
            },
            function ( error )
            {
                done ( error.error.message );
            }

        );

    } );

    it ( 'fetch - read an account', function ( done )
    {
        var frame   =
        {
            fetch       : true,
            accountId   : 1
        };

        var option  =
        {
            url_part    : 'account',
            verb        : 'POST'
        };

        dataframe.invoke_frame ( frame, option ).then (

            function ( value )
            {
                done ( );
            },
            function ( error )
            {
                done ( error );
            }

        );

    } );

    it ( 'login - with a token', function ( done )
    {
        var frame   =
        {
            login       : true,
            userName    : 'test@domain.com',
            password    : '123456'
        };

        var option  =
        {
            url_part    : 'account',
            verb        : 'POST'
        };

        dataframe.invoke_frame ( frame, option ).then (

            function ( value )
            {
                done ( );
            },
            function ( error )
            {
                done ( error );
            }

        );

    } );

    it ( 'check - that a token is still good', function ( done )
    {
        var frame   =
        {
            login       : true,
            userName    : 'test@domain.com',
            password    : '123456'
        };

        var option  =
        {
            url_part    : 'account',
            verb        : 'POST'
        };

        dataframe.invoke_frame ( frame, option ).then (

            function ( value )
            {
                expect ( value ).to.have.property ( 'data' );
                expect ( value ).to.have.property ( 'header' );
                expect ( value ).to.have.property ( 'status' );

                expect ( value.data ).to.have.property ( 'length' );
                expect ( value.data.length ).to.be.above ( 1 );

                var result = JSON.parse ( value.data ).result;

                frame   =
                {
                    check    : true,
                    userName : 'test@domain.com',
                    token    : result.token
                };

                option  =
                {
                    url_part    : 'account',
                    verb        : 'POST'
                };

                return dataframe.invoke_frame ( frame, option );

            },
            function ( error )
            {
                throw ( error );
            }

        ).then (

            function ( value )
            {
                expect ( value ).to.have.property ( 'status' );
                expect ( value.status ).to.equal ( 200 );

                done ( );
            },
            function ( error )
            {
                throw ( error );
            }

        ).catch (

            function ( ex )
            {
                throw ( ex );
            }

        );

    } );


} );
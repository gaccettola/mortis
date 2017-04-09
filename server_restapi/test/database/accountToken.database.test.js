
/*jslint node: true */
'use strict';

var dotenv      = require ( 'dotenv'     ).config(),
    assert      = require ( 'assert'     ),
    expect      = require ( 'chai'       ).expect,
    path        = require ( 'path'       ),
    sprintf     = require ( 'sprintf'    ),
    mysql       = require ( 'mysql'      ),
    Promise     = require ( 'bluebird'   );

var dataframe   = require ( '../_helper/dataframe.base' ) ( );

describe ( 'dbverify accountToken', function ( )
{
    it ( 'should call accountToken write', function ( done )
    {
        var accountId = 1111;
        var token     = '111';

        var script = sprintf ( 'CALL %s( %s, %s );',
            'sp_accountToken_write',
            mysql.escape ( accountId ),
            mysql.escape ( token )
        );

        dataframe.sp_exec ( script ).then (

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

    it ( 'should call accountToken fetch', function ( done )
    {
        var accountTokenId = 1;

        var script = sprintf ( 'CALL %s( %s );',
            'sp_accountToken_fetch',
            mysql.escape ( accountTokenId )
        );

        dataframe.sp_exec ( script ).then (

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

    it ( 'should call accountToken fetch_account', function ( done )
    {
        var accountId = 1;

        var script = sprintf ( 'CALL %s( %s );',
            'sp_accountToken_fetch_account',
            mysql.escape ( accountId )
        );

        dataframe.sp_exec ( script ).then (

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

    it ( 'should call accountToken patch', function ( done )
    {
        var accountTokenId = 1;
        var accountId      = 2;
        var token          = '222222';

        var script = sprintf ( 'CALL %s( %s, %s, %s );',
            'sp_accountToken_patch',
            mysql.escape ( accountTokenId ),
            mysql.escape ( accountId  ),
            mysql.escape ( token  )
        );

        dataframe.sp_exec ( script ).then (

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

} );
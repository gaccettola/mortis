
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

describe ( 'dbverify token', function ( )
{
    it ( 'should call token write', function ( done )
    {
        var userName = 'sam';
        var userSalt = 'salt';
        var userHash = 'salt';

        var script = sprintf ( 'CALL %s( %s, %s, %s );',
            'sp_token_write',
            mysql.escape ( userName ),
            mysql.escape ( userSalt ),
            mysql.escape ( userHash )
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

    it ( 'should call token fetch', function ( done )
    {
        var tokenId = 1;

        var script = sprintf ( 'CALL %s( %s );',
            'sp_token_fetch',
            mysql.escape ( tokenId )
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

    it ( 'should call token patch', function ( done )
    {
        var tokenId = 1;
        var userName  = 'sam';
        var userSalt  = 'salt';
        var userHash  = 'salt';

        var script = sprintf ( 'CALL %s( %s, %s, %s, %s );',
            'sp_token_patch',
            mysql.escape ( tokenId ),
            mysql.escape ( userName  ),
            mysql.escape ( userSalt  ),
            mysql.escape ( userHash  )
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

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

describe ( 'system check', function ( )
{
    it ( 'should call account write', function ( done )
    {
        var userName = 'sam';
        var userSalt = 'salt';
        var userHash = 'salt';

        var script = sprintf ( 'CALL %s( %s, %s, %s );',
            'sp_account_write',
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

    it ( 'should call account fetch', function ( done )
    {
        var accountId = 1;

        var script = sprintf ( 'CALL %s( %s );',
            'sp_account_fetch',
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

    it ( 'should call account fetchuser', function ( done )
    {
        var userName = 'sam';

        var script = sprintf ( 'CALL %s( %s );',
            'sp_account_fetch_user',
            mysql.escape ( userName )
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

    it ( 'should call account patch', function ( done )
    {
        var accountId = 1;
        var userName  = 'sam';
        var userSalt  = 'salt';
        var userHash  = 'salt';

        var script = sprintf ( 'CALL %s( %s, %s, %s, %s );',
            'sp_account_patch',
            mysql.escape ( accountId ),
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

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

describe ( 'dbverify userRole', function ( )
{
    it ( 'should call userRole write', function ( done )
    {
        var userName = 'sam';
        var userSalt = 'salt';
        var userHash = 'salt';

        var script = sprintf ( 'CALL %s( %s, %s, %s );',
            'sp_userRole_write',
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

    it ( 'should call userRole fetch', function ( done )
    {
        var userRoleId = 1;

        var script = sprintf ( 'CALL %s( %s );',
            'sp_userRole_fetch',
            mysql.escape ( userRoleId )
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

    it ( 'should call userRole patch', function ( done )
    {
        var userRoleId = 1;
        var userName  = 'sam';
        var userSalt  = 'salt';
        var userHash  = 'salt';

        var script = sprintf ( 'CALL %s( %s, %s, %s, %s );',
            'sp_userRole_patch',
            mysql.escape ( userRoleId ),
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
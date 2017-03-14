
/*jslint node: true */
'use strict';

// ////////////////////////////////////////////////////////////////////////////
//
// system requirements,

var dotenv      = require ( 'dotenv'   ).config(),
    Promise     = require ( 'bluebird' ),
    _           = require ( 'lodash'   ),
    chalk       = require ( 'chalk'    );

var readline    = require ( 'readline' );
var path        = require ( 'path'     );
var fs          = require ( 'fs'       );

// ////////////////////////////////////////////////////////////////////////////
//
// implementation


    var vm = this || {};

    vm.rollforward = './database/rollforward.rc';

    vm.rl = readline.createInterface (
    {
        input: fs.createReadStream ( vm.rollforward )

    } );

    vm.sql_scripts = [];

    vm.rl.on ( 'line', process_line );

    function process_line ( line )
    {
        if ( ! _.isString   ( line ) )       return;

        if ( _.startsWith ( line, '#' ) )    return;

        if ( _.startsWith ( line, ';' ) )    return;

        if ( ! _.includes   ( line, '::' ) ) return;

        var line_array = line.split ( '::' );

        process_script ( line_array );
    }

    function process_script ( line_array )
    {
        if ( ! _.isArray   ( line_array ) )  return;

        if ( 2 !== line_array.length )       return;

        var line_alias = _.trim ( line_array[0] );
        var line_route = _.trim ( line_array[1] );

        process_route ( line_alias, line_route );

    }

    function process_route ( line_alias, line_route )
    {
        var database_script = path.join ( __dirname, './database', line_route );

        if ( ! fs.existsSync ( database_script ) )  return;

        var script_content  = fs.readFileSync ( database_script, 'utf8' );

        var script_split    = /\r\n|\n\r|\n|\r/g;

        var script_lines    = script_content
                                .replace ( script_split, '\n' )
                                .split ( '\n' );

        var script_array    = [];
        var script_buffer   = '';

        _.forEach ( script_lines, function ( line )
        {
            // if the line starts with '-- go' take the buffer
            //      then move the buffer into the array, reset the buffer
            // else append the line to the array

            var line_lower = _.toLower ( line );

            if ( ! _.isString ( line_lower ) )
            {
                // nothing to do here
            }
            else if ( _.startsWith ( line_lower, '-- go' ) )
            {
                script_array.push ( script_buffer );

                script_buffer = '';
            }
            else if ( _.startsWith ( line_lower, '--go' ) )
            {
                script_array.push ( script_buffer );

                script_buffer = '';
            }
            else
            {
                script_buffer += line;
                script_buffer += '\n';
            }

        } );

        if ( 0 < script_buffer.length )
        {
            script_array.push ( script_buffer );
        }

        process_script_array ( line_alias, line_route, script_array );

    }

    function process_script_array ( line_alias, line_route, script_array )
    {
        _.forEach ( script_array, function ( script )
        {
            console.log ( chalk.white ( _.repeat ( '-', 88 ) ) );

            console.log ( '-- ', _.padEnd ( line_alias, 40 ), ' :: ', line_route );

            console.log ( _.trim ( script ) );

            // console.log ( '' );

        } );

    }
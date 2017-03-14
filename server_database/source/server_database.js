
/*jslint node: true */
'use strict';

// ////////////////////////////////////////////////////////////////////////////
//
// system requirements,

var dotenv      = require ( 'dotenv'   ).config(),
    chalk       = require ( 'chalk'    ),
    _           = require ( 'lodash'   ),
    sprintf     = require ( 'sprintf'  ),
    readline    = require ( 'readline' ),
    path        = require ( 'path'     ),
    fs          = require ( 'fs'       );

// ////////////////////////////////////////////////////////////////////////////
//
// implementation

    var rollforward_rc = './database/rollforward.rc';

    var rollforward_script = path.join ( __dirname, rollforward_rc );

    var script_content = fs.readFileSync ( rollforward_script, 'utf8' );

    if ( fs.existsSync ( rollforward_script ) )
    {
        var rollforward_array   = [];

        var rollforward_split   = /\r\n|\n\r|\n|\r/g;

        var rollforward_lines   = script_content.replace ( rollforward_split, '\n' ).split ( '\n' );

        _.forEach ( rollforward_lines, function ( line )
        {
            var results = process_line ( line );

            if ( results )
            {
                _.forEach ( results, function ( script )
                {
                    rollforward_array.push ( script );

                } );
            }

        } );

        _.forEach ( rollforward_array, print_script );

    }

    function process_line ( line )
    {
        if ( _.startsWith ( line, '#' ) || _.startsWith ( line, ';' ) )
            return;

        if ( ! _.includes   ( line, '::' ) ) return;

        return process_script ( line.split ( '::' ) );
    }

    function process_script ( line_array )
    {
        if ( ! _.isArray   ( line_array ) )  return;

        if ( 2 !== line_array.length )       return;

        var line_alias = _.trim ( line_array[0] );
        var line_route = _.trim ( line_array[1] );

        return process_route ( line_alias, line_route );
    }

    function process_route ( line_alias, line_route )
    {
        var database_script = path.join ( __dirname, './database', line_route );

        if ( ! fs.existsSync ( database_script ) )  return;

        var script_content  = fs.readFileSync ( database_script, 'utf8' );

        var script_split    = /\r\n|\n\r|\n|\r/g;

        var script_lines    = script_content.replace ( script_split, '\n' ).split ( '\n' );

        var script_array    = [];
        var script_buffer   = '';

        _.forEach ( script_lines, function ( line )
        {
            var line_lower = _.toLower ( line );

            if ( _.startsWith ( line_lower, '-- go' ) || _.startsWith ( line_lower, '--go' )  )
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

        if ( 0 < script_buffer.length ) script_array.push ( script_buffer );

        return process_script_array ( line_alias, line_route, script_array );
    }

    function process_script_array ( line_alias, line_route, script_array )
    {
        var retval = [];

        var script_index = 0;

        _.forEach ( script_array, function ( script )
        {
            retval.push (
            {
                index : script_index,
                alias : line_alias,
                route : line_route,
                script: script,

            } );

            ++script_index;

        } );

        return retval;
    }

    function print_script ( script )
    {
        console.log ( chalk.white ( _.repeat ( '-', 88 ) ) );

        var script_header = sprintf ( "-- %s :: %s",
            _.padEnd ( script.alias + '[' + script.index + ']', 40 ),
            script.route
        );

        console.log ( script_header );

        console.log ( _.trim ( script.script ) );
    }
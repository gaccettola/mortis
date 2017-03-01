
'use strict';


var electron        = require ( 'electron-prebuilt' );
var pathUtil        = require ( 'path'              );
var childProcess    = require ( 'child_process'     );
var kill            = require ( 'tree-kill'         );
var utils           = require ( './utils'           );
var watch;

var gulpPath = pathUtil.resolve ( './node_modules/.bin/gulp' );

if ( process.platform === 'win32' )
{
    gulpPath += '.cmd';
}

function runBuild ( )
{

    return new Promise ( function ( resolve, reject )
    {
        var build = childProcess.spawn ( gulpPath, [
            'build',
            '--env=' + utils.getEnvName ( ),
            '--color'
        ], {
            stdio: 'inherit'
        } );

        build.on ( 'close', function ( code )
        {
            resolve ( );

        } );

    } );

}

function runGulpWatch ( )
{
    watch = childProcess.spawn ( gulpPath,
        [
            'watch',
            '--env=' + utils.getEnvName(),
            '--color'
        ],
        {
            stdio: 'inherit'
        }
    );

    watch.on ( 'close', function ( code )
    {
        runGulpWatch();

    } );
}

function runApp()
{
    var app = childProcess.spawn( electron, ['./build'],
    {
        stdio: 'inherit'
    } );

    app.on ( 'close', function ( code )
    {
        if ( undefined !== watch && undefined !== watch.pid )
        {
            kill ( watch.pid, 'SIGKILL', function ()
            {
                process.exit();

            } );

        }

    } );

}

runBuild().then (

    function ()
    {
        runApp();
    }
);

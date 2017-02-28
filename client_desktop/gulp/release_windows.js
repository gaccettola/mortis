
'use strict';

var gulpUtil        = require ( 'gulp-util'             );
var child_process   = require ( 'child_process'         );
var jetpack         = require ( 'fs-jetpack'            );
var fs              = require ( 'fs'                    );
var asar            = require ( 'asar'                  );
var utils           = require ( './utils'               );

var exec            = require ( 'child-process-promise' ).exec;
var spawn           = require ( 'child-process-promise' ).spawn;

var projectDir;
var releasesDir;
var tmpDir;
var manifest;

var readyAppDir;




function init ( )
{
    return new Promise ( function ( resolve, reject )
    {
        projectDir      = jetpack;
        tmpDir          = projectDir.dir('./tmp', { empty: true });
        releasesDir     = projectDir.dir('./releases');
        manifest        = projectDir.read('app/package.json', 'json');
        readyAppDir     = tmpDir.cwd(manifest.name);

        resolve ( );

    } );

}

function copy_runtime ( )
{
    return projectDir.copy (

        'node_modules/electron-prebuilt/dist',
        readyAppDir.path(),
        {
            overwrite : true
        }
    );
}

function cleanup_runtime ( )
{
    return readyAppDir.removeAsync ( 'resources/default_app' );
}

function package_built_app()
{
    return new Promise ( function ( resolve, reject )
    {
        asar.createPackage ( projectDir.path('build'), readyAppDir.path('resources/app.asar' ), function ()
        {
            resolve ( );

        } );

    } );
}

function finalize ( )
{
    return new Promise ( function ( resolve, reject )
    {
        projectDir.copy ( 'resources/windows/icon.ico', readyAppDir.path ( 'icon.ico' ) );

        var rcedit = require('rcedit');

        rcedit ( readyAppDir.path ( 'electron.exe'),
            {
                'icon'           : projectDir.path ( 'resources/windows/icon.ico' ),
                'version-string' :
                {
                    'ProductName'     : manifest.productName,
                    'FileDescription' : manifest.description,
                }
            },
            function ( err )
            {
                if ( err )
                {
                    resolve ( );
                }

            }
        );

    } );

}

function rename_app ( )
{
    return readyAppDir.renameAsync (

        'electron.exe',
        manifest.productName + '.exe'

    );
}

function create_installer ( )
{
    return new Promise ( function ( resolve, reject )
    {
        var finalPackageName = manifest.name + '_' + manifest.version + '.exe';
        var installScript    = projectDir.read('resources/windows/installer.nsi');

        installScript = utils.replace (

            installScript,
            {
                name        : manifest.name,
                productName : manifest.productName,
                author      : manifest.author,
                version     : manifest.version,
                src         : readyAppDir.path(),
                dest        : releasesDir.path(finalPackageName),
                icon        : readyAppDir.path('icon.ico'),
                setupIcon   : projectDir.path('resources/windows/setup-icon.ico'),
                banner      : projectDir.path('resources/windows/setup-banner.bmp'),
            }
        );

        tmpDir.write ( 'installer.nsi', installScript );

        gulpUtil.log ( 'Building installer with NSIS...' );

        // Remove destination file if already exists.
        releasesDir.remove(finalPackageName);

        // Note: NSIS have to be added to PATH (environment variables).

        var nsis = child_process.spawn (

            'makensis',
            [
                tmpDir.path ( 'installer.nsi' )
            ],
            {
                stdio: 'inherit'
            }

        );

        nsis.on ( 'error', function ( err )
        {
            if ( err.message === 'spawn makensis ENOENT' )
            {
                throw "Can't find NSIS. Are you sure you've installed it and added to PATH environment variable?";

            } else
            {
                throw err;
            }

        } );

        nsis.on ( 'close', function ()
        {
            gulpUtil.log ( 'Installer ready!', releasesDir.path ( finalPackageName ) );

            resolve ( );

        } );

    } );

}

function clean_clutter ()
{
    return new Promise ( function ( resolve, reject )
    {
        resolve ( );

    } );
}

module.exports = function ()
{
    return init()
        .then  ( copy_runtime )
        .then  ( cleanup_runtime )
        .then  ( package_built_app )
        .then  ( finalize )
        .then  ( rename_app )
        .then  ( create_installer )
        .then  ( clean_clutter )
        .catch ( console.error );
};


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
var packDir;
var packName;


function init ( )
{
    return new Promise ( function ( resolve, reject )
    {
        projectDir      = jetpack;
        tmpDir          = projectDir.dir('./tmp', { empty: true });
        releasesDir     = projectDir.dir('./releases');
        manifest        = projectDir.read('app/package.json', 'json');
        packName        = manifest.name + '_' + manifest.version;
        packDir         = tmpDir.dir(packName);
        readyAppDir     = packDir.cwd('opt', manifest.name);

        resolve ( );

    } );

}

function copy_runtime ( )
{
    return projectDir.copy (

        'node_modules/electron-prebuilt/dist',
        readyAppDir.path(),
        {
            overwrite: true
        }

    );
}

function package_built_app ( )
{
    return new Promise ( function ( resolve, reject )
    {
        asar.createPackage (

            projectDir.path('build'),
            readyAppDir.path('resources/app.asar'),
            function ()
            {
                resolve ( );

            }
        );

    } );

}

function finalize ( )
{
    console.log ( 'linux build, finalize' );

    return new Promise ( function ( resolve, reject )
    {
        // Create .desktop file from the template
        var desktop = projectDir.read('resources/linux/app.desktop');

        desktop = utils.replace ( desktop,
        {
            name        : manifest.name,
            productName : manifest.productName,
            description : manifest.description,
            version     : manifest.version,
            author      : manifest.author

        } );

        packDir.write ( 'usr/share/applications/' + manifest.name + '.desktop', desktop );

        // Copy icon
        projectDir.copy( 'resources/icon.png', readyAppDir.path( 'icon.png' ) );

        resolve ( );

    } );

}

function rename_app ( )
{
    return readyAppDir.renameAsync ( "electron", manifest.name );
}

function pack_to_deb_file ( )
{
    return new Promise ( function ( resolve, reject )
    {
        var debFileName = packName + '_amd64.deb';

        var debPath     = releasesDir.path ( debFileName );

        gulpUtil.log ( 'Creating DEB package...' );

        // Counting size of the app in KiB
        var appSize = Math.round ( readyAppDir.inspectTree('.').size / 1024 );

        // Preparing debian control file
        var control = projectDir.read('resources/linux/DEBIAN/control');

        control = utils.replace( control,
        {
            name        : manifest.name,
            description : manifest.description,
            version     : manifest.version,
            author      : manifest.author,
            size        : appSize

        } );

        packDir.write ( 'DEBIAN/control', control );

        var exec_command =
            'fakeroot dpkg-deb -Zxz --build '    +
            packDir.path().replace(/\s/g, '\\ ') +
            ' '                                  +
            debPath.replace(/\s/g, '\\ '         );

        exec ( exec_command ).then (

            function ( result )
            {
                var stdout = result.stdout;
                var stderr = result.stderr;

                if ( stderr || stderr )
                {
                    console.log ( "ERROR building DEB package:" );

                    console.log ( stderr );
                    console.log ( stderr );

                } else
                {
                    gulpUtil.log ( 'DEB package ready!', debPath );
                }

                resolve();
            }

        ).catch (

            function ( err )
            {
                console.error ( 'ERROR: ', err );
            }

        );

    } );

}

function clean_clutter ( )
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
        .then  ( package_built_app )
        .then  ( finalize )
        .then  ( rename_app )
        .then  ( pack_to_deb_file )
        .then  ( clean_clutter )
        .catch ( console.error );

};

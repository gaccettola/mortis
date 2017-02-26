
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

var finalAppDir;




function init ( )
{
    return new Promise ( function ( resolve, reject )
    {
        projectDir  = jetpack;
        tmpDir      = projectDir.dir('./tmp', { empty: true });
        releasesDir = projectDir.dir('./releases');
        manifest    = projectDir.read('app/package.json', 'json');
        finalAppDir = tmpDir.cwd(manifest.productName + '.app');

        resolve ( );

    } );

}

function copy_runtime ( )
{
    return projectDir.copy('node_modules/electron-prebuilt/dist/Electron.app', finalAppDir.path());
}

function cleanup_runtime ( )
{
    return new Promise ( function ( resolve, reject )
    {
        finalAppDir.remove ( 'Contents/Resources/default_app' );

        finalAppDir.remove ( 'Contents/Resources/atom.icns' );

        resolve ( );

    } );

}

function package_built_app ( )
{
    return new Promise ( function ( resolve, reject )
    {
        asar.createPackage (

            projectDir.path ( 'build' ),
            finalAppDir.path ( 'Contents/Resources/app.asar' ),
            function ()
            {
                resolve();
            }
        );

    } );

}

function finalize ( )
{
    return new Promise ( function ( resolve, reject )
    {
        var info = projectDir.read (

            'resources/osx/Info.plist'
        );

        info = utils.replace (
            info,
            {
                productName : manifest.productName,
                identifier  : manifest.identifier,
                version     : manifest.version
            }
        );

        finalAppDir.write ( 'Contents/Info.plist', info );

        // Prepare Info.plist of Helper apps

        [' EH', ' NP', ''].forEach ( function ( helper_suffix )
        {
            info = projectDir.read (

                'resources/osx/helper_apps/Info' +
                helper_suffix + '.plist'

            );

            info = utils.replace ( info,
                {
                    productName : manifest.productName,
                    identifier  : manifest.identifier
                }
            );

            finalAppDir.write (
                'Contents/Frameworks/Electron Helper'   +
                helper_suffix                           +
                '.app/Contents/Info.plist',
                info
            );

        } );

        // Copy icon
        projectDir.copy (

            'resources/osx/icon.icns',
            finalAppDir.path ( 'Contents/Resources/icon.icns' )
        );

        resolve ( );

    } );

}

function rename_app ( )
{
    return new Promise ( function ( resolve, reject )
    {
        [' Helper EH', ' Helper NP', ' Helper'].forEach (

            function ( helper_suffix )
            {
                finalAppDir.rename (

                    'Contents/Frameworks/Electron' +
                    '.app/Contents/MacOS/Electron' +
                    helper_suffix, manifest.productName + helper_suffix

                );

                finalAppDir.rename (

                    'Contents/Frameworks/Electron' +
                    helper_suffix +
                    '.app',
                    manifest.productName + helper_suffix + '.app'
                );

            }
        );

        finalAppDir.rename ( 'Contents/MacOS/Electron', manifest.productName );

        resolve ( );

    } );

}

function sign_app ( )
{
    var identity = 'XXXXXXXXXX';

    if ( identity )
    {
        var cmd =
            'codesign --deep --force --sign "'  +
            identity                            +
            '" "'                               +
            finalAppDir.path()                  +
            '"';

        gulpUtil.log ( 'Signing with:', cmd );

        return Q.nfcall ( child_process.exec, cmd );

    } else
    {
        return Q();
    }
}

function pack_to_dmg_file ( )
{
    return new Promise ( function ( resolve, reject )
    {
        var appdmg = require ( 'appdmg' );

        var dmgName = manifest.name + '_' + manifest.version + '.dmg';

        // Prepare appdmg config
        var dmgManifest = projectDir.read ( 'resources/osx/appdmg.json' );

        dmgManifest = utils.replace (

            dmgManifest,
            {
                productName     : manifest.productName,
                appPath         : finalAppDir.path(),
                dmgIcon         : projectDir.path("resources/osx/dmg-icon.icns"),
                dmgBackground   : projectDir.path("resources/osx/dmg-background.png")
            }
        );

        tmpDir.write('appdmg.json', dmgManifest);

        // Delete DMG file with this name if already exists

        releasesDir.remove ( dmgName );

        gulpUtil.log ( 'Packaging to DMG file...' );

        var readyDmgPath = releasesDir.path ( dmgName );

        appdmg ( {

            source : tmpDir.path('appdmg.json'),
            target : readyDmgPath

        } ).on ( 'error', function (err)
        {
            console.error(err);

        } ).on ( 'finish', function ()
        {
            gulpUtil.log('DMG file ready!', readyDmgPath);

            resolve ( );

        } );

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
        .then  ( cleanup_runtime )
        .then  ( package_built_app )
        .then  ( finalize )
        .then  ( rename_app )
        .then  ( sign_app )
        .then  ( pack_to_dmg_file )
        .then  ( clean_clutter )
        .catch ( console.error );
};

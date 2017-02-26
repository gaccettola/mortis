'use strict';

var pathUtil        = require('path');
var Promise         = require('bluebird');
var gulp            = require('gulp');
var rollup          = require('rollup');
var less            = require('gulp-less');
var jetpack         = require('fs-jetpack');
var templateCache   = require('gulp-angular-templatecache');
var utils           = require('./utils');
var rename          = require("gulp-rename");

var projectDir      = jetpack;
var srcDir          = projectDir.cwd('./app');
var destDir         = projectDir.cwd('./build');

var paths =
{
    vendor_css :
    [
        './node_modules/angular-material/angular-material.css'

    ],
    vendors_jquery :
    [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/lodash/lodash.min.js',
        './node_modules/httpinvoke/httpinvoke-browser.js',
        './node_modules/sprintf/lib/sprintf.js'

    ],
    vendors_js :
    [
        './node_modules/moment-duration-format/lib/moment-duration-format.js',
        './node_modules/rsvp/dist/rsvp.js'

    ],
    vendor_ng :
    [
        './node_modules/angular/angular.js',
        './node_modules/angular-aria/angular-aria.js',
        './node_modules/angular-messages/angular-messages.js',
        './node_modules/angular-sanitize/angular-sanitize.js',
        './node_modules/angular-ui-router/release/angular-ui-router.js',
        './node_modules/angular-material/angular-material.js',
        './node_modules/angular-animate/angular-animate.js'

    ],
    copy_app_dir :
    [
        './vendor/**',
        './index.html'

    ],
    app_templates :
    [
        'app/**/*.html',
        '!app/index.html'

    ]
};

function clean ( callback )
{
    return destDir.dirAsync ( '.', { empty: true } );
}


function build_template_cache ( )
{
    var htmlTemplates = gulp.src( paths.app_templates );

    return gulp.src( paths.app_templates )
        .pipe( templateCache( 'templatecache.js', { module:'templatecache', standalone:true } ) )
        .pipe( gulp.dest( destDir.path() ) );
}

function bundle ( src, dest )
{
    return new Promise ( function ( resolve, reject )
    {
        rollup.rollup ( {  entry: src  } ).then (

            function ( bundle )
            {
                var jsFile = pathUtil.basename(dest);

                var result = bundle.generate (
                    {
                        format          : 'cjs',
                        sourceMap       : true,
                        sourceMapFile   : jsFile

                    }
                );

                var isolatedCode = '(function () {' + result.code + '\n}());';

                return Promise.all (
                    [
                        destDir.writeAsync( dest, isolatedCode + '\n//# sourceMappingURL=' + jsFile + '.map'),
                        destDir.writeAsync( dest + '.map', result.map.toString() )
                    ]
                );
            }

        ).then (

            function ()
            {
                resolve ( );
            }

        ).catch (

            function ( err )
            {
                console.error ( 'Build: Error during rollup', err.stack );
            }

        );

    } );

}

function bundle_part (src )
{
    return bundle ( srcDir.path( src ), destDir.path( src ) );
}

function bundle_application ( )
{
    return Promise.all (
    [
        bundle_part ( 'main.js' ),
        bundle_part ( 'mainApp.js' ),

        bundle_part ( './window_main/window_main.js' ),

        bundle_part ( 'app.js' ),
        bundle_part ( 'app.uiRouter.js' ),
    ] );
}

function bundle_task ( )
{
    return bundle_application ( );
}

function lessTask ( )
{
    return gulp.src('app/stylesheets/main.less')
        .pipe( less() )
        .pipe( gulp.dest( destDir.path('stylesheets') ) );
}

function copy_app_to_build (moduleName )
{
    jetpack.copy ( 'app/node_modules/'   + moduleName,
                   'build/node_modules/' + moduleName );
}

function copy_task ( )
{
    jetpack.copy ( 'app/'   + 'styles',
                   'build/' + 'styles' );

    copy_app_to_build ( 'moment' );

    copy_app_to_build ( 'sqlite3' );

    copy_app_to_build ( 'debug-menu' );

    copy_app_to_build ( 'minimatch' );

    copy_app_to_build ( 'mkdirp' );

    copy_app_to_build ( 'bluebird' );

    copy_app_to_build ( 'rimraf' );

    copy_app_to_build ( 'glob' );

    copy_app_to_build ( 'brace-expansion' );

    copy_app_to_build ( 'concat-map' );

    copy_app_to_build ( 'balanced-match' );

    copy_app_to_build ( 'fs.realpath' );

    copy_app_to_build ( 'inherits' );

    copy_app_to_build ( 'path-is-absolute' );

    copy_app_to_build ( 'inflight' );

    copy_app_to_build ( 'wrappy' );

    copy_app_to_build ( 'once' );

    copy_app_to_build ( 'fs-jetpack' );

    copy_app_to_build ( 'keyboardjs' );

    gulp.src( paths.vendor_css, { cwd: 'app' } )
        .pipe( gulp.dest ('./build/vendor'   ) );

    gulp.src( paths.vendors_jquery, { cwd: 'app' } )
        .pipe( gulp.dest ('./build/vendor'       ) );

    gulp.src( paths.vendors_js, { cwd: 'app' } )
        .pipe( gulp.dest ('./build/vendor' ) );

    gulp.src( paths.vendor_ng, { cwd: 'app' } )
        .pipe( gulp.dest ('./build/vendor' ) );

    return projectDir.copy ( 'app', destDir.path(),
    {
        overwrite : true,
        matching  : paths.copy_app_dir

    } );

}

function prune_task ( )
{
    jetpack.remove ( './build/node_modules/sqlite3/build/'              );
    jetpack.remove ( './build/node_modules/sqlite3/deps/'               );
    jetpack.remove ( './build/node_modules/sqlite3/src/'                );
    jetpack.remove ( './build/node_modules/sqlite3/lib/binding/node-*'  );
}

function finalize ( )
{
    var manifest = srcDir.read ( 'package.json', 'json');

    switch ( utils.getEnvName() )
    {
        case 'development':

            manifest.name           += '-dev';
            manifest.productName    += '_Dev';
            break;

    }

    manifest.env = projectDir.read ( 'config/env_' + utils.getEnvName() + '.json', 'json' );

    destDir.write ( 'package.json', manifest );
}

function build_task ( )
{
    console.log ( 'done' );
}

gulp.task ( 'clean', clean );

gulp.task ( 'build_template_cache', ['clean'],      build_template_cache );

gulp.task ( 'bundle', ['build_template_cache'],     bundle_task );

gulp.task ( 'copy_task', ['bundle'],                copy_task );

gulp.task ( 'prune_task', ['copy_task'],            prune_task );

gulp.task ( 'finalize', ['prune_task'],             finalize );

gulp.task ( 'build', ['finalize'],                  build_task );

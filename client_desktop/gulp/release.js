'use strict';

var Q       = require('q');
var gulp    = require('gulp');
var utils   = require('./utils');
var jetpack = require('fs-jetpack');

var releaseForOs =
{
    osx     : require('./release_osx'),
    linux   : require('./release_linux'),
    windows : require('./release_windows')
};

function waitForBackground ()
{
    return new Promise ( function ( resolve, reject )
    {
        console.time( 'waiting on background build' );

        setTimeout ( function()
        {
            console.timeEnd ( 'waiting on background build' );

            resolve ( );

        }, 10000 );

    } );

}

gulp.task ( 'releaseOnly', function ()
{
    jetpack.remove('./releases/');
    jetpack.remove('./tmp/');

    releaseForOs[utils.os()]();

} );

gulp.task ( 'release', ['build'], function ()
{
    jetpack.remove('./releases/');
    jetpack.remove('./tmp/');

    waitForBackground ().then (

        function ( value )
        {
            return releaseForOs[utils.os()]();
        }
    );

} );

// application entry

import os                       from 'os';                  // native node.js module
import { ipcRenderer, remote }  from 'electron';            // native electron module
import jetpack                  from 'fs-jetpack';          // module loaded from npm
import env                      from './env';

var app         = remote.app;

const debugMenu = require ( 'debug-menu' );

debugMenu.install ();

var vm = window;

document.addEventListener ( 'DOMContentLoaded', function ()
{
    window.electronProp =
    {
        platform    : os.platform(),
        enviroment  : env.name
    };

} );

// electron entry

import { app, BrowserWindow, ipcMain, Menu, Tray } from 'electron';

import window_state_keeper from './vendor/window_state';

var main_window;
var web_contents;

const path = require ( 'path' );
const url  = require ( 'url'  );

var main_window_state = window_state_keeper ( 'main',
{
    width   : 1280,
    height  : 768

} );

let appIcon = null;

function create_main_window ()
{
    main_window = new BrowserWindow (
    {
        show        : false,
        x           : main_window_state.x,
        y           : main_window_state.y,
        width       : main_window_state.width,
        height      : main_window_state.height,
        minWidth    : 400,
        minHeight   : 600

    } );

    web_contents = main_window.webContents;

    web_contents.openDevTools ( { detach : true } );

    if ( main_window_state.isMaximized )
    {
        main_window.maximize();
    }

    main_window.loadURL ( 'file://' + __dirname + '/index.html' );

    Menu.setApplicationMenu( null );

    main_window.on ( 'close', function ()
    {
        main_window_state.saveState ( main_window );

    } );

    main_window.on ( 'closed', function()
    {
        main_window = null;

    } );

    main_window.webContents.on ( 'did-finish-load', function ()
    {
        main_window.show ( );

        console.log ( 'window_main is now visible!' );

    } );

}

app.on ( 'ready', function ()
{
    create_main_window ( );

    main_window.loadURL ( 'file://' + __dirname + '/index.html' );

    Menu.setApplicationMenu ( null );

    main_window.on ( 'close', function ()
    {
        main_window_state.saveState ( main_window );

    } );

} );

app.on ( 'window-all-closed', function ()
{
    app.quit();

} );


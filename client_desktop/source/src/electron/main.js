
const electron = require('electron');

//noinspection JSUnresolvedVariable
const app = electron.app;

//noinspection JSUnresolvedVariable
const BrowserWindow = electron.BrowserWindow;
const Menu          = electron.Menu;

//noinspection NodeJsCodingAssistanceForCoreModules
const path = require('path');

const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var main_window;
var web_contents;

function create_main_window ( )
{
    // Create the browser window.
    main_window = new BrowserWindow (
    {
        show        : false,
        width       : 1024,
        height      : 768,
        minWidth    : 480,
        minHeight   : 640

    } );

    web_contents = main_window.webContents;

    web_contents.openDevTools ( { detach : true } );

    //noinspection JSUnresolvedFunction
    main_window.loadURL ( url.format (
    {
        pathname    : path.join ( __dirname, 'index.html' ),
        protocol    : 'file:',
        slashes     : true

    } ) );

    Menu.setApplicationMenu( null );

    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    // main_window.webContents.openDevTools();

    // Emitted when the window is closed.
    main_window.on ( 'closed', function ( )
    {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        main_window = null;

    } );

    main_window.webContents.on ( 'did-finish-load', function ()
    {
        main_window.show ( );

        console.log ( 'app_info is now visible!' );

    } );

}

app.on ( 'ready', function ()
{
    create_main_window ( );

    main_window.loadURL ( 'file://' + __dirname + '/index.html' );

    Menu.setApplicationMenu ( null );

    main_window.on ( 'close', function ()
    {
        // main_window_state.saveState ( main_window );

    } );

} );

app.on ( 'window-all-closed', function ()
{
    app.quit();

} );

app.on ( 'activate', function ( )
{
    if ( null === main_window )
    {
        create_main_window ( );
    }

} );

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

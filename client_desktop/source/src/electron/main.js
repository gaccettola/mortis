
const electron      = require ( 'electron' );
const ipcMain       = require ( 'electron' ).ipcMain;
const tray          = require ( './tray' );
const window_state  = require ( './window_state' );

//noinspection JSUnresolvedVariable
const app = electron.app;

//noinspection JSUnresolvedVariable
const BrowserWindow = electron.BrowserWindow;
const Menu          = electron.Menu;

//noinspection NodeJsCodingAssistanceForCoreModules
const path = require ( 'path' );

const url = require ( 'url' );



var main_window;
var web_contents;

var main_window_state = window_state.create_state_saver ( 'main',
{
    width   : 1280,
    height  : 768

} );

function create_main_window ( )
{
    // Create the browser window.
    main_window = new BrowserWindow (
    {
        show        : false,
        x           : main_window_state.get_x ( ),
        y           : main_window_state.get_y ( ),
        width       : main_window_state.get_width ( ),
        height      : main_window_state.get_height ( ),
        minWidth    : 480,
        minHeight   : 640

    } );

    web_contents = main_window.webContents;

    web_contents.openDevTools ( { detach : true } );

    if ( main_window_state.is_maximized ( ) )
    {
        main_window.maximize ( );
    }

    //noinspection JSUnresolvedFunction
    main_window.loadURL ( url.format (
    {
        pathname    : path.join ( __dirname, 'index.html' ),
        protocol    : 'file:',
        slashes     : true

    } ) );

    tray.create_tray ( main_window );

    Menu.setApplicationMenu( null );

    main_window.on ( 'close', function ( )
    {
        main_window_state.save_state ( main_window );

    } );

    main_window.on ( 'closed', function ( )
    {
        main_window = null;

    } );

    main_window.webContents.on ( 'did-finish-load', function ()
    {
        main_window.show ( );

    } );

}

app.on ( 'ready', function ()
{
    create_main_window ( );

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

// asynchronous-message
ipcMain.on ( 'ngEvent_async', function ( event, arg )
{
    console.log ( 'asynchronous-message', arg );

    event.sender.send ( 'asynchronous-reply', 'pong' );

} );

// synchronous-message
ipcMain.on ( 'ngEvent_sync', function ( event, arg )
{
    console.log ( 'synchronous-message', arg );

    event.returnValue = 'pong';

} );

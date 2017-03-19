
const electron = require ( 'electron' );

//noinspection JSUnresolvedVariable
const app = electron.app;

//noinspection NodeJsCodingAssistanceForCoreModules
const path = require ( 'path' );

let tray = null;

function create_tray ( main_window )
{
    if ( process.platform === 'darwin' || tray )
    {
        return;
    }

    const icon_path = path.join ( __dirname, './tray_small.png' );

    const toggle_main_window = function ( )
    {
        if ( main_window.isVisible() )
        {
            main_window.hide ( );

        } else
        {
            main_window.show ( );
        }
    };

    const contextMenu = electron.Menu.buildFromTemplate (
    [
        {
            label : 'Toggle Mortis',
            click ( )
            {
                toggle_main_window ( );
            }
        },
        {
            type  : 'separator'
        },
        {
            label : 'Quit',
            click ( )
            {
                app.quit ( );
            }
        }

    ] );

    tray = new electron.Tray ( icon_path );

    tray.setToolTip ( 'Mortis' );

    tray.setContextMenu ( contextMenu );

    tray.on ( 'click', toggle_main_window );
}

exports.create_tray = create_tray;

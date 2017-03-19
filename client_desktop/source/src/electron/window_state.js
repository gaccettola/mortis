
const electron  = require ( 'electron' );
const jetpack   = require ( 'fs-jetpack' );

//noinspection JSUnresolvedVariable
const app = electron.app;

function create_state_saver ( name, defaults )
{
    var userDataDir = jetpack.cwd ( app.getPath ( 'userData' ) );

    var stateStoreFile = 'window-state-' + name +'.json';

    var state = userDataDir.read ( stateStoreFile, 'json' ) ||
    {
        width  : defaults.width,
        height : defaults.height
    };

    function get_x ( )
    {
        return state.x;
    }

    function get_y ( )
    {
        return state.y;
    }

    function get_width ( )
    {
        return state.width;
    }

    function get_height ( )
    {
        return state.height;
    }

    function save_state ( win )
    {
        if ( ! win.isMaximized() && !win.isMinimized() )
        {
            var position = win.getPosition();
            var size     = win.getSize();
            state.x      = position[0];
            state.y      = position[1];
            state.width  = size[0];
            state.height = size[1];
        }

        state.isMaximized = win.isMaximized();

        userDataDir.write ( stateStoreFile, state, { atomic: true } );
    }

    function is_maximized ( )
    {
        return state.isMaximized;
    }

    var api =
    {
        get_x           : get_x,
        get_y           : get_y,
        get_width       : get_width,
        get_height      : get_height,

        is_maximized    : is_maximized,

        save_state      : save_state
    };

    return api;

}

exports.create_state_saver = create_state_saver;

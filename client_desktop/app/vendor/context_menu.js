
( function ()
{
    'use strict';

    var remote          = require('electron').remote;
    var Menu            = remote.Menu;
    var MenuItem        = remote.MenuItem;
    var right_click_pos = null;

    var inspect = new MenuItem (
    {
        label: "Inspect",
        click: function ()
        {
            remote
                .getCurrentWindow()
                .inspectElement( right_click_pos.x, right_click_pos.y )
        }
    } );

    var textMenu = new Menu();

    textMenu.append ( inspect );

} ( ) );

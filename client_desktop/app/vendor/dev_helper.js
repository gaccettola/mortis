
import { app, Menu, BrowserWindow } from 'electron';

var setDevMenu = function ()
{
    Menu.setApplicationMenu( null );
};

export default
{
    setDevMenu: setDevMenu
}

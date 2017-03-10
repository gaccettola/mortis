
import { Component, OnInit } from '@angular/core';

@Component (
{
    moduleId    : module.id
,   selector    : 'app-root'
,   templateUrl : './app.component.html'
,   styleUrls   : ['./app.component.css']
} )
export class AppComponent implements OnInit
{
    isMenuOpen:         boolean = false;

    isMenuAutoClose:    boolean = true;     // TODO: move to SettingService
    menuAutoCloseMs:    number  = 100;      // TODO: move to SettingService

    title = 'app works!';

    constructor ( )
    {
    }

    ngOnInit ( ) : void
    {
    }

    on_event_toggle_sidebar_menu  ( nav_event: any ) : void
    {
        this.isMenuOpen = !this.isMenuOpen;
    }

    on_event_select_sidebar_menu_item ( menu_item: any ) : void
    {
        if ( true === this.isMenuOpen && this.isMenuAutoClose )
        {
            setTimeout( () => { this.isMenuOpen = false; }, this.menuAutoCloseMs );
        }
    }

}

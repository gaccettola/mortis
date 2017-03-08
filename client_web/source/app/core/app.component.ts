
import { Component, OnInit } from '@angular/core';

@Component (
{
    moduleId        : module.id
,   selector        : 'app-root'
,   templateUrl     : 'app.component.html'
,   styleUrls       : ['app.component.scss']
} )
export class AppComponent implements OnInit
{
    isMenuOpen:  boolean = false;

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
        console.log ( menu_item.name );
    }

}
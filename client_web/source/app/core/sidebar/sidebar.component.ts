
import { Component, ViewEncapsulation, OnChanges, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SimpleChanges } from '@angular/core';


import { Observable }       from "rxjs/Observable";
import { BehaviorSubject }  from "rxjs/Rx";

import { SidebarService } from './sidebar.service';

const windowSize$ = new BehaviorSubject( getWindowSize() );

function getWindowSize ( )
{
    let retval =
    {
        height : window.innerHeight,
        width  : window.innerWidth
    };

    return retval;
}

@Component (
{
    moduleId        : module.id,
    selector        : 'app-sidebar',
    templateUrl     : 'sidebar.component.html',
    styleUrls       : ['sidebar.component.scss'],
    encapsulation   : ViewEncapsulation.None,
} )
export class SidebarComponent implements OnInit, OnChanges
{
     @Input() isMenuOpen:   boolean;
     @Output() onMenuItem   = new EventEmitter ( );

    nav_center_left_size:   string;
    nav_center_left_flex:   string;
    initWinHeight:          number  = 0;

    nav_center_left_mini:   string  = `48px`;
    nav_center_left_open:   string  = `280px`;

    nav_center_left_width:  string  = this.nav_center_left_mini;

    listof_menu_item:       any[]   = [];

    logout_menu_item:       any     = {};

    constructor ( private sidebarService: SidebarService )
    {
    }

    ngOnChanges ( changes: SimpleChanges )
    {
        if ( this.isMenuOpen )
        {
            this.nav_center_left_width = this.nav_center_left_open;

        } else
        {
            this.nav_center_left_width = this.nav_center_left_mini;
        }
    }

    ngOnInit ( )
    {
        Observable
            .fromEvent ( window, 'resize' )
            .debounceTime ( 200 )
            .subscribe( ( event ) =>
            {
                this.resizeFn ( event );
            } );

        this.initWinHeight = window.innerHeight;

        this.init_listof_menu_item ( );

        this.resizeFn ( null );
    }

    init_listof_menu_item ( ) : void
    {
        this.listof_menu_item = this.sidebarService.get_listof_menu_item ( );

        this.logout_menu_item = this.sidebarService.get_menu_item_logoff ( );
    }

    on_select_sidebar_menu_item ( menu_item: any ) : void
    {
        this.onMenuItem.emit ( menu_item );
    }

    private resizeFn ( e: any )
    {
        let left_height_size: number = e ? e.target.innerHeight : this.initWinHeight;

        left_height_size -= 48; // minus the top nav
        left_height_size -= 24; // minus the footer

        if ( 1 > left_height_size ) left_height_size = 240;

        this.nav_center_left_size = `${left_height_size}px`;

        let left_height_flex = left_height_size;

        left_height_flex -= 48; // minus the dashboard
        left_height_flex -= 48; // minus the messages
        left_height_flex -= 48; // minus the flag
        left_height_flex -= 48; // minus the settings
        left_height_flex -= 48; // minus the logout / power

        this.nav_center_left_flex = `${left_height_flex}px`;
    }

}

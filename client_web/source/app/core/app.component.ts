
import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/Rx";

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

@Component ( {
    moduleId        : module.id,
    selector        : 'app-root',
    templateUrl     : 'app.component.html',
    styleUrls       : ['app.component.scss'],
    encapsulation   : ViewEncapsulation.None,
} )
export class AppComponent implements OnInit
{
    name:                   string;
    minHeight:              string;
    private initWinHeight:  number = 0;

    show_nav_center_left:   boolean = true;
    show_nav_center_right:  boolean = true;

    constructor ( )
    {
    }

    ngOnInit ( ) : void
    {
        console.log ( 'ngOnInit AppComponent' );

        this.name = 'Mortis';

        Observable
            .fromEvent ( window, 'resize' )
            .debounceTime ( 200 )
            .subscribe( ( event ) =>
            {
                this.resizeFn ( event );
            } );

        this.initWinHeight = window.innerHeight;

        this.resizeFn ( null );
    }

    on_select_page_header_menu_button ( ) : void
    {
        this.show_nav_center_left  = true;
        this.show_nav_center_right = true;
    }

    on_select_nav_center_left ( ) : void
    {
        this.show_nav_center_left = false;
    }

    on_select_nav_center_right ( ) : void
    {
        this.show_nav_center_right = false;
    }

    private resizeFn ( e: any )
    {
        let winHeight: number = e ? e.target.innerHeight : this.initWinHeight;

        winHeight -= 48;
        winHeight -= 24;

        if ( 1 > winHeight ) winHeight = 240;

        this.minHeight = `${winHeight}px`;
    }

}
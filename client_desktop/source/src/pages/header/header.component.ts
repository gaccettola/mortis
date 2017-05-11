
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component (
{
    selector    : 'app-header'
,   templateUrl : './header.component.html'
,   styleUrls   : ['./header.component.scss']
} )
export class HeaderComponent implements OnInit
{
    @Output() navToggled = new EventEmitter ( );

    name    : string  = '';
    navOpen : boolean = false;

    constructor ( )
    {
    }

    ngOnInit ( )
    {
        this.name = '';
    }

    on_select_page_header_menu_button ( )
    {
        this.navOpen = !this.navOpen;

        this.navToggled.emit ( this.navOpen );
    }

}

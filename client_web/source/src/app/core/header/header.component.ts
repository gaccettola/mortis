
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component (
{
    moduleId        : module.id,
    selector        : 'app-header',
    templateUrl     : './header.component.html',
    styleUrls       : ['header.component.css']
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
        this.name = 'Mortis';
    }

    on_select_page_header_menu_button ( )
    {
        this.navOpen = !this.navOpen;

        this.navToggled.emit ( this.navOpen );
    }

}

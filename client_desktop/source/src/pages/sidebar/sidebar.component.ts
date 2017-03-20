
import { Component, OnChanges, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SimpleChanges }    from '@angular/core';
import { Subscription }     from 'rxjs/Subscription';

import { DataframeAccount } from '../../services/dataframe.account.service';

import { LayoutService  }   from '../../services/layout.service';
import { RouteService  }    from '../../services/route.service';

@Component (
{
    selector    : 'app-sidebar',
    templateUrl : './sidebar.component.html',
    styleUrls   : ['./sidebar.component.scss']
} )
export class SidebarComponent implements OnInit, OnChanges
{
     @Input() isMenuOpen:   boolean;
     @Output() onMenuItem   = new EventEmitter ( );

    sidebar_height_flex:    string;

    nav_center_left_mini:   string  = `48px`;
    nav_center_left_open:   string  = `280px`;

    nav_center_left_width:  string  = this.nav_center_left_mini;

    listof_menu_item:       any[]   = [];

    logout_menu_item:       any     = {};

    subscription:           Subscription;

    constructor ( private _dataframeAccount : DataframeAccount,
                  private _routeService     : RouteService,
                  private _layoutService    : LayoutService )
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
        this.init_listof_menu_item ( );

        this.subscription = this._layoutService.observe_content_height ( ).subscribe (

            value => { this.resizeFn ( ); }

        );
    }

    init_listof_menu_item ( ) : void
    {
        this.listof_menu_item = this._routeService.get_listof_menu_item ( );

        this.logout_menu_item = this._routeService.get_menu_item_logoff ( );
    }

    on_select_sidebar_menu_item ( menu_item: any ) : void
    {
        if ( -1 === menu_item.id )
        {
            this._dataframeAccount.logout ( );

        } else
        {
            this.onMenuItem.emit ( menu_item );

            this._routeService.transition_to ( menu_item );
        }

    }

    private resizeFn ( )
    {
        let adjusted_height = this._layoutService.get_current_height ( );

        let adjust_for_menu = this._routeService.get_menu_item_count ( );

        adjust_for_menu *= 48;

        // adjusted_height -= 48;  // minus the dashboard
        // adjusted_height -= 48;  // minus the messages
        // adjusted_height -= 48;  // minus the flag
        // adjusted_height -= 48;  // minus the settings
        // adjusted_height -= 48;  // minus the logout / power

        adjusted_height -= adjust_for_menu;

        this.sidebar_height_flex = `${adjusted_height}px`;
    }

}

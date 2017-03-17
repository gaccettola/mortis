
import { Component, OnInit } from '@angular/core';
import { Subscription }      from 'rxjs/Subscription';

import { DataframeAccount }  from '../services/dataframe.account.service';

@Component (
{
    selector    : 'app-root'
,   templateUrl : './app.component.html'
,   styleUrls   : ['./app.component.css']
} )
export class AppComponent implements OnInit
{
    isAuthenticated     : boolean; // = false;
    isMenuOpen          : boolean; // = false;

    isMenuAutoClose     : boolean; //  = true;     // TODO: move to SettingService
    menuAutoCloseMs     : number;  //   = 100;     // TODO: move to SettingService

    account_token_subscription  : Subscription;

    constructor ( private _dataframeAccount : DataframeAccount )
    {
    }

    ngOnInit ( ) : void
    {
        this.account_token_subscription = this._dataframeAccount.observe_account_token ( ).subscribe (

            value =>
            {
                if ( null === value )
                {
                    this.isAuthenticated = false;

                } else
                {
                    this.isAuthenticated = true;
                }

            }

        );

        this.isAuthenticated    = false;
        this.isMenuOpen         = false;
        this.isMenuAutoClose    = true;
        this.menuAutoCloseMs    = 100;
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

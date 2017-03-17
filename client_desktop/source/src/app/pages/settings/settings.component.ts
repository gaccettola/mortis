
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }                 from 'rxjs/Subscription';

import { LayoutService  }               from '../../services/layout.service';
import { SocketService }                from '../../services/socket.service';
import { DataframeAccount }             from '../../services/dataframe.account.service';

@Component (
{
    selector    : 'settings'
,   templateUrl : './settings.component.html'
,   styleUrls   : ['./settings.component.scss']
} )
export class SettingsComponent implements OnInit
{
    current_height      : string;
    height_subscription : Subscription;

    current_token       : any;
    token_subscription  : Subscription;

    constructor ( private _layoutService    : LayoutService,
                  private _socketService    : SocketService,
                  private _dataframeAccount : DataframeAccount )
    {
    }

    ngOnInit ( ) : void
    {
        this.height_subscription = this._layoutService.observe_content_height ( ).subscribe (

            value => { this.resizeFn ( ); }

        );

        this.token_subscription = this._dataframeAccount.observe_account_token ( ).subscribe (

            value => { this.current_token = value; }

        );

        this._socketService.engine_init ( );
    }

    ngOnDestroy ( )
    {
        this.height_subscription.unsubscribe();
        this.token_subscription.unsubscribe();
    }

    private resizeFn ( )
    {
        this.current_height = this._layoutService.get_content_height ( );
    }

}

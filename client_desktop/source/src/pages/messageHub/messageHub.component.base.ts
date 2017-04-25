
import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { ActivatedRoute }               from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';

import { LayoutService  }               from '../../services/layout.service';
import { SocketService }                from '../../services/socket.service';
import { DataframeAccount }             from '../../services/dataframe.account.service';
import { DataframeMessageHub }          from '../../services/dataframe.messageHub.service';

@Component (
{
    selector    : 'messageHub'
,   templateUrl : './messageHub.component.base.html'
,   styleUrls   : ['./messageHub.component.base.scss']
} )
export class MessageHubComponent implements OnInit
{
    current_height          : string;
    message_subscription    : Subscription;
    height_subscription     : Subscription;

    constructor ( private _route                : ActivatedRoute
                , private _layoutService        : LayoutService
                , private _socketService        : SocketService
                , private _dataframeMessageHub  : DataframeMessageHub )
    {
    }

    ngOnInit ( ) : void
    {
        this.height_subscription = this._layoutService.observe_content_height ( ).subscribe (

            value => { this.resizeFn ( ); }

        );

        this._socketService.engine_init ( );
    }

    // ngAfterContentInit ( )
    // {
    //     this.message_subscription = this._socketService.observe_message ( ).subscribe (
    //
    //         value =>
    //         {
    //             console.log ( `message posted` );
    //         }
    //
    //     );
    //
    // }

    ngOnDestroy ( )
    {
        this.height_subscription.unsubscribe();
    }

    private resizeFn ( )
    {
        this.current_height = this._layoutService.get_content_height ( );
    }

}


import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }                 from 'rxjs/Subscription';

import { RouteService  }                from '../../services/route.service';
import { LayoutService  }               from '../../services/layout.service';
import { SocketService }                from '../../services/socket.service';
import { DataframeAccount }             from '../../services/dataframe.account.service';

import * as jQuery                      from 'jquery';

@Component (
{
    selector    : 'login'
,   templateUrl : './login.component.html'
,   styleUrls   : ['./login.component.scss']
} )
export class LoginComponent implements OnInit
{
    current_height      : string;
    height_subscription : Subscription;

    current_token       : any;
    token_subscription  : Subscription;

    username        : string = 'gabriel@accettolasystems.com';
    password        : string = 'accettolasystems not com';

    constructor ( private _routeService     : RouteService,
                  private _layoutService    : LayoutService,
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

            value =>
            {
                this.current_token = value;
            }

        );

        this._socketService.engine_init ( );
    }

    ngAfterContentInit ( )
    {
        jQuery('.mat-input-wrapper').css('width', '100%');
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

    login ( ) : void
    {
        let payload =
        {
            userName    : this.username,
            password    : this.password
        };

        this._dataframeAccount.login ( payload ).then (

            ( value ) =>
            {
                let obj = JSON.parse ( value.data );

                this._routeService.transition_to ( { href : `/dashboard` } );
            },
            ( error ) =>
            {
                let obj = JSON.parse ( error.data );

                console.log ( obj );
            }

        );
    }

    forgot ( ) : void
    {
        console.log ( `one moment` );
    }

    signup ( ) : void
    {
        let payload =
        {
            userName    : this.username,
            password    : this.password
        };

        this._dataframeAccount.write ( payload ).then (

            ( value ) =>
            {
                let obj = JSON.parse ( value.data );

                return value;
            },
            ( error ) =>
            {
                let obj = JSON.parse ( error.data );

                console.log ( obj );
            }

        );
    }

}

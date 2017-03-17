
import { Component, ViewChild }         from '@angular/core';

import { App, Events, Nav }             from 'ionic-angular';
import { Subscription }                 from 'rxjs/Subscription';

import { DashboardComponent }           from '../dashboard/dashboard.component';

import { SocketService }                from '../../services/socket.service';
import { DataframeAccount }             from '../../services/dataframe.account.service';

import * as jQuery                      from 'jquery';

@Component (
{
    selector    : 'login'
,   templateUrl : 'login.component.html'
} )
export class LoginComponent
{
    @ViewChild ( Nav ) nav: Nav;

    title           : string    = 'Login';

    current_height      : string;
    height_subscription : Subscription;

    current_token       : any;
    token_subscription  : Subscription;

    username        : string = 'gabriel@accettolasystems.com';
    password        : string = 'accettolasystems not com';

    constructor ( private _app              : App,
                  private _events           : Events,
                  private _socketService    : SocketService,
                  private _dataframeAccount : DataframeAccount )
    {
        console.log ( `::ctor` );
    }

    //
    // Runs when the page has loaded. This event only happens once per page being created.
    // If a page leaves but is cached, then this event will not fire again on a subsequent viewing.
    // The ionViewDidLoad event is good place to put your setup code for the page.
    //
    ionViewDidLoad ( ) : void
    {
        console.log ( `::ionViewDidLoad` );
    }

    //
    // Runs when the page is about to enter and become the active page.
    //
    ionViewWillEnter ( ) : void
    {
        console.log ( `::ionViewWillEnter` );
    }

    //
    // Runs when the page has fully entered and is now the active page.
    // This event will fire, whether it was the first load or a cached page.
    //
    ionViewDidEnter ( ) : void
    {
        console.log ( `::ionViewDidEnter` );

        this.token_subscription = this._dataframeAccount.observe_account_token ( ).subscribe (

            value => { this.current_token = value; }

        );

        this._socketService.engine_init ( );

        jQuery('.mat-input-wrapper').css('width', '100%');
    }

    //
    // Runs when the page is about to leave and no longer be the active page.
    //
    ionViewWillLeave ( ) : void
    {
        console.log ( `::ionViewWillLeave` );
    }

    //
    // Runs when the page has finished leaving and is no longer the active page.
    //
    ionViewDidLeave ( ) : void
    {
        this.token_subscription.unsubscribe();

        console.log ( `::ionViewDidLeave` );
    }

    //
    // Runs when the page is about to be destroyed and have its elements removed.
    //
    ionViewWillUnload ( ) : void
    {
        console.log ( `::ionViewWillUnload` );
    }

    //
    // Runs before the view can enter. This can be used as a sort of "guard" in authenticated
    // views where you need to check permissions before the view can enter
    //
    ionViewCanEnter ( ) : boolean
    {
        console.log ( `::ionViewCanEnter` );

        return true;
    }

    //
    // Runs before the view can leave. This can be used as a sort of "guard" in authenticated
    // views where you need to check permissions before the view can leave
    //
    ionViewCanLeave ( ) : boolean
    {
        console.log ( `::ionViewCanLeave` );

        return true;
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

                this._app.getRootNav().setRoot(DashboardComponent);
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

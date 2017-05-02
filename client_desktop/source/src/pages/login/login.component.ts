
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }               from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';

import { MdSnackBar }                   from '@angular/material';

import { RouteService  }                from '../../services/route.service';
import { LayoutService  }               from '../../services/layout.service';
import { SocketService }                from '../../services/socket.service';
import { DataframeAccount }             from '../../services/dataframe.account.service';

import { NotifyService }                from '../../services/notify.service';

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

    username        : string = '';
    password        : string = '';

    constructor ( private _route            : ActivatedRoute
                , private _routeService     : RouteService
                , private _layoutService    : LayoutService
                , private _socketService    : SocketService
                , private _dataframeAccount : DataframeAccount
                , private _notifyService    : NotifyService
                , private _snackBar         : MdSnackBar )
    {
    }

    ngOnInit ( ) : void
    {
        this.current_token = this._route.snapshot.data['token'];

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
        jQuery('.mat-input-wrapper').css( 'width', '100%' );
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
                let message = `login successful`;
                let label   = ``;
                this._snackBar.open ( message, label, { duration: 1500 } );

                this._routeService.transition_to ( { href : `/dashboard` } );
            },
            ( error ) =>
            {
                this.password = ``;

                let message = `login not available`;
                let label   = ``;

                if ( error && error.data )
                {
                    let obj = JSON.parse ( error.data );

                    label = obj.result;

                } else if ( error && error.error && error.error.toString )
                {
                    label = error.error.toString ( );
                }

                this._snackBar.open ( message, label, { duration: 5000 } );
            }

        );
    }

    forgot ( ) : void
    {
        let message = `forget something?`;
        this._snackBar.open ( message, ``, { duration: 5000 } );

        let current_permission = this._notifyService.permission();

        console.log ( current_permission );

        this._notifyService.request_permission ( ).then (

            ( value ) =>
            {
                this._notifyService.send_notification ( 'title', 'body', './assets/icon/favicon.ico' );
            },
            ( error ) =>
            {
                console.log ( '', error );
            }

        );
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
                let message = `signup successful`;
                let label   = `try logging in now`;
                this._snackBar.open ( message, label, { duration: 5000 } );

                return value;
            },
            ( error ) =>
            {
                this.password = ``;

                let message = `signup not available`;

                let label   = ``;

                if ( error && error.data )
                {
                    let obj = JSON.parse ( error.data );

                    label = obj.result;

                } else if ( error && error.error && error.error.toString )
                {
                    label = error.error.toString ( );
                }

                this._snackBar.open ( message, label, { duration: 5000 } );
            }

        );
    }

}

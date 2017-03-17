
import { Component, Optional, OnInit }      from '@angular/core';
import { Subscription }                     from 'rxjs/Subscription';

import {MdDialog, MdDialogRef, MdSnackBar}  from '@angular/material';

import { LayoutService  }       from '../../services/layout.service';
import { SocketService }        from '../../services/socket.service';
import { DataframeAccount }     from '../../services/dataframe.account.service';

import * as jQuery              from 'jquery';

@Component (
{
    selector    : 'settings'
,   templateUrl : './settings.component.html'
,   styleUrls   : ['./settings.component.scss']
} )
export class SettingsComponent implements OnInit
{
    current_height  : string;
    content_height_subscription : Subscription;
    account_token_subscription  : Subscription;

    username        : string = 'gabriel@accettolasystems.com';
    password        : string = 'accettolasystems not com';

    constructor ( private _layoutService    : LayoutService,
                  private _socketService    : SocketService,
                  private _dataframeAccount : DataframeAccount,
                  private _dialog           : MdDialog,
                  private _snackbar         : MdSnackBar )
    {

    }

    ngOnInit ( ) : void
    {
        this.content_height_subscription = this._layoutService.observe_content_height ( ).subscribe (

            value => { this.resizeFn ( ); }

        );

        this.account_token_subscription = this._dataframeAccount.observe_account_token ( ).subscribe (

            value =>
            {
                if ( null === value )
                {
                    console.log ( 'account token updated {0} -', value );

                } else
                {
                    console.log ( 'account token updated {1} -', value );
                }

            }

        );

        this._socketService.engine_init ( );
    }

    ngAfterContentInit ( )
    {
        jQuery('.mat-input-wrapper').css('width', '100%');
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

                return value;
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

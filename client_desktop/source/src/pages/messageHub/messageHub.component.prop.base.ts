
import { Component, OnInit, OnDestroy, AfterContentInit, NgZone } from '@angular/core';
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core';

import { ActivatedRoute }               from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';

import { LayoutService  }               from '../../services/layout.service';
import { SocketService }                from '../../services/socket.service';
import { DataframeAccount }             from '../../services/dataframe.account.service';
import { DataframeMessageHub }          from '../../services/dataframe.messageHub.service';

import * as jQuery                      from 'jquery';
import * as _                           from 'lodash';

@Component (
{
    selector    : 'messageHubProp'
,   templateUrl : './messageHub.component.prop.base.html'
,   styleUrls   : ['./messageHub.component.base.scss']
} )
export class MessageHubComponentPropBase implements OnInit
{
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    current_height          : string;
    message_subscription    : Subscription;
    height_subscription     : Subscription;

    view_config         : any =
    {
        filter          : '',
        message         : ''
    };

    selected_offline    : boolean = true;
    selected_contact    : any     = { contact_name : '', contact_number : '' };
    listof_contact      : any []  =
    [
        { contact_name  : 'gabriel', contact_number : '+19547745358' },
        { contact_name  : 'kara',    contact_number : '+19545361329' },
        { contact_name  : 'logan',   contact_number : '+19548069113' },
        { contact_name  : 'luis',    contact_number : '+17867971927' },
        { contact_name  : 'maya',    contact_number : '+13054505516' },
    ];

    listof_message      : any [] = [];

    constructor ( protected _ngZone             : NgZone
                , private _route                : ActivatedRoute
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

    ngAfterViewChecked()
    {
        this.scrollToBottom ( );
    }

    scrollToBottom ( ) : void
    {
        try
        {
            // this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;

            let ele = document.getElementsByClassName('hub-message-col');

            let eleArray = <Element[]>Array.prototype.slice.call(ele);

            eleArray.map ( val =>
            {
                val.scrollTop = val.scrollHeight;

            } );

        } catch ( err )
        {

        }
    }

    ngAfterContentInit ( )
    {
        this.message_subscription = this._socketService.observe_message ( ).subscribe (

            value => this._ngZone.run ( ( ) =>
            {
                console.log ( `message posted...` );

                this.refresh_history ( );

                console.log ( `message posted.` );
            } )

        );

    }

    ngOnDestroy ( )
    {
        this.height_subscription.unsubscribe();
    }

    private resizeFn ( )
    {
        this.current_height = this._layoutService.get_content_height ( );
    }

    on_toolbar_send ( )
    {
        let payload =
        {
            messageTo   : this.selected_contact.contact_number,
            messageBody : this.view_config.message
        };

        this._dataframeMessageHub.write ( payload ) .then (

            ( value ) =>
            {
                console.log ( '_dataframeMessageHub.write -', value );

                this.view_config.message = '';

                this.refresh_history ( );
            },
            ( error ) =>
            {
                console.log ( '!!! ERROR : _dataframeMessageHub.write -', error );
            }

        );

    }

    refresh_history ( ) : Promise<any>
    {
        return new Promise ( ( resolve, reject ) => this._ngZone.run ( ( ) =>
        {
            if ( ! this.selected_contact ||
                 ! this.selected_contact.contact_number ||
                 0 === this.selected_contact.contact_number.length )
            {
                resolve ( true );

            } else
            {
                this.selected_offline = false;

                let payload =
                {
                    messageTo   : this.selected_contact.contact_number,
                    messageBody : this.view_config.message
                };

                this._dataframeMessageHub.history ( payload ) .then (

                    ( value ) =>
                    {
                        console.log ( '_dataframeMessageHub.history -', value );

                        this.listof_message = value;

                        this.listof_message = _.sortBy ( this.listof_message, 'dateCreated' );

                        this.scrollToBottom ( );

                        resolve ( true );
                    },
                    ( error ) =>
                    {
                        this.listof_message   = [];

                        console.log ( '!!! ERROR : _dataframeMessageHub.history -', error );

                        resolve ( true );

                    }

                );

            }

        } ) );

    }

    on_change_selected_contact ( event ) : void
    {
        this.refresh_history ( );
    }

}

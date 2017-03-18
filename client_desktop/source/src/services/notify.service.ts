
import { Injectable, OnInit } from '@angular/core';

declare var window          : any;
declare var Notification    : any;

@Injectable()
export class NotifyService
{
    _Notification;

    notification_display : number = 2500;

    local_thing : string = 'thing1';

    constructor ( )
    {
        this.verify_init ( );
    }

    verify_init ( ) : boolean
    {
        let retval : boolean = false;

        if ( ! window )
            return retval;

        if ( ! window.Notification )
            return retval;

        retval = true;

        if ( this._Notification )
            return retval;

        this._Notification = window.Notification;
    }

    // default : The user hasn't been asked for permission yet, so notifications won't be displayed.
    // granted : The user has granted permission to display notifications, after having been asked previously.
    // denied  : The user has explicitly declined permission to show notifications.
    permission () : string
    {
        let retval = '';

        if ( ! this.verify_init ( ) )
            return retval;

        retval = this._Notification.permission;

        return retval;
    }

    request_permission () : Promise<boolean>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let retval : boolean = false;

            if ( this.has_permission () )
            {
                retval = true;

                resolve ( retval );
            }

            this._Notification.requestPermission( ( status ) =>
            {
                retval = ( `granted` === this.permission () );

                resolve ( retval );

            } );

        } );

    }

    has_permission () : boolean
    {
        let retval : boolean = false;

        retval = ( `granted` === this.permission () );

        return retval;
    }

    send_notification ( message_title : string,
                        message_body  : string,
                        message_icon  : string ) : void
    {
        if ( ! this.has_permission() ) return;

        let message_options : any = { };

        if ( message_body && 0 < message_body.length )
        {
            message_options.body = message_body;
        }

        if ( message_icon && 0 < message_icon.length )
        {
            message_options.icon = message_icon;
        }

        let n = new Notification ( message_title, message_options );

        n.onclick = ( ) =>
        {
            console.log ( 'notification clicked - ', this.local_thing );
        };

        n.onclose = ( ) =>
        {
            console.log ( 'notification closed - ', this.local_thing );
        };

        setTimeout( () =>
        {
            n.close ( );

        }, this.notification_display );

    }

}

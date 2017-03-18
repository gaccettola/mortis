
import { Injectable, OnInit } from '@angular/core';

import { LocalNotifications } from 'ionic-native';

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

        retval = true;

        return retval;
    }

    // default : The user hasn't been asked for permission yet, so notifications won't be displayed.
    // granted : The user has granted permission to display notifications, after having been asked previously.
    // denied  : The user has explicitly declined permission to show notifications.
    permission () : string
    {
        let retval = 'granted';

        return retval;
    }

    request_permission () : Promise<boolean>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let retval : boolean = false;

            resolve ( retval );

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

        LocalNotifications.schedule (
        {
            id      : 1,
            text    : message_body,
            data    : { secret : message_body }
        } );

    }

}

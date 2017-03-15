
import { Injectable, NgZone }   from '@angular/core';
import * as httpinvoke          from 'httpinvoke';

@Injectable()
export class HttpInvokeService
{
    my_name : string = 'taco';

    constructor ( private _ngZone : NgZone )
    {
    }

    invoke_active ( ) : void
    {
        let option =
        {
            url_part : 'active',
            verb     : 'POST'
        };

        let frame =
        {
            fetch       : true,
            activeId    : -1,
            userId      : -2,
            businessId  : -2
        };

        let encoded_frame = Object.keys ( frame ).map ( function ( key )
        {
            return encodeURIComponent ( key ) + '=' + encodeURIComponent ( frame [ key ] );

        } ).join ( '&' );

        let url_base = 'http://localhost:8989/v1/';

        let url_complete = url_base + option.url_part;

        httpinvoke ( url_complete, option.verb,
        {
            headers :
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            input   : encoded_frame

        }, ( error, data, status, header ) => this._ngZone.run ( ( ) =>
        {
            var retval  =
            {
                error   : error,
                data    : data,
                status  : status,
                header  : header
            };

            console.log ( this.my_name );
            console.log ( retval );

        } ) );

    }

}

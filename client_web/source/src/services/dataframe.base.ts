
import { Injectable, NgZone }   from '@angular/core';

import * as httpinvoke          from 'httpinvoke';

import { environment }          from '../environments/environment';

export interface IHttpInvokeResult {
    error   : any;
    data    : any;
    status  : number;
    header  : any;
}

@Injectable()
export class DataframeBase
{
    constructor ( protected _ngZone : NgZone )
    {
    }

    invoke_frame ( frame : any, option : any ) : Promise<IHttpInvokeResult>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let encoded_frame = Object.keys ( frame ).map ( function ( key )
            {
                return encodeURIComponent ( key ) + '=' + encodeURIComponent ( frame [ key ] );

            } ).join ( '&' );

            let url_base = environment.restapiurl;

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
                let retval  : IHttpInvokeResult =
                {
                    error   : error,
                    data    : data,
                    status  : status,
                    header  : header
                };

                if ( retval && 200 === retval.status )
                {
                    resolve ( retval );

                } else
                {
                    reject ( retval );
                }

            } ) );

        } );

    }

}

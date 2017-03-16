
import { Injectable, NgZone }   from '@angular/core';
import { DataframeBase }        from '../base/dataframe.base';

@Injectable()
export class DataframeAccount extends DataframeBase
{
    constructor ( _ngZone : NgZone )
    {
        super ( _ngZone );
    }

    frameoption () : any
    {
        let retval : any =
        {
            url_part : 'account',
            verb     : 'POST'
        };

        return retval;
    }

    login ( payload ) : Promise<any>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let frame =
            {
                login       : true,
                userName    : payload.userName,
                password    : payload.password
            };

            this.invoke_frame ( frame, this.frameoption () ).then (

                ( value ) =>
                {
                    resolve ( value );
                },
                ( error ) =>
                {
                    reject ( error );
                }

            );

        } );
    }

    write ( payload ) : Promise<any>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let frame =
            {
                write       : true,
                userName    : payload.userName,
                password    : payload.password
            };

            this.invoke_frame ( frame, this.frameoption () ).then (

                ( value ) =>
                {
                    resolve ( value );
                },
                ( error ) =>
                {
                    reject ( error );
                }

            );

        } );
    }

}

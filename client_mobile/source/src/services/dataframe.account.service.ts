
import { Injectable, NgZone }   from '@angular/core';

import { Observable }           from 'rxjs/Rx';
import { BehaviorSubject }      from "rxjs/Rx";

import { DataframeBase, IHttpInvokeResult }        from './dataframe.base';

import { NotifyService }        from './notify.service';

@Injectable()
export class DataframeAccount extends DataframeBase
{

    account_token         :any;
    account_token_subject = new BehaviorSubject( this.account_token );

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

    observe_account_token ( ) : Observable<any>
    {
        return this.account_token_subject.asObservable();
    }

    login ( payload ) : Promise<IHttpInvokeResult>
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
                    console.log ( value );

                    if ( 200 === value.status )
                    {
                        this.account_token = JSON.parse ( value.data );

                    } else
                    {
                        this.account_token = null;
                    }

                    this.account_token_subject.next ( this.account_token );

                    resolve ( value );
                },
                ( error ) =>
                {
                    this.account_token = null;

                    this.account_token_subject.next ( this.account_token );

                    reject ( error );
                }

            );

        } );
    }

    logout ( ) : void
    {
        this.account_token = null;

        this.account_token_subject.next ( this.account_token );
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

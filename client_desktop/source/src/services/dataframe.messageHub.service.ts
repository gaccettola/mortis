
import { Injectable, NgZone }   from '@angular/core';

import { Observable }           from 'rxjs/Rx';
import { BehaviorSubject }      from "rxjs/Rx";

import { DataframeBase, IHttpInvokeResult } from './dataframe.base';

import { DatastoreService, IStoreConfig }   from './datastore.service';

import * as RSVP                from 'rsvp';

@Injectable()
export class DataframeMessageHub extends DataframeBase
{
    store_config    : IStoreConfig =
    {
        store_key   : 'messageHubId',
        store_name  : 'messageHub'
    };

    constructor ( protected _ngZone : NgZone,
                  private   _store  : DatastoreService )
    {
        super ( _ngZone );

        _store.init ( this.store_config ).then (

            () => {},
            () => {}

        );
    }

    frameoption ( ) : any
    {
        let retval : any =
        {
            url_part : 'messageHub',
            verb     : 'POST'
        };

        return retval;
    }

    write ( payload ) : Promise<IHttpInvokeResult>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let frame =
            {
                write       : true,
                messageTo   : payload.messageTo,
                messageBody : payload.messageBody,
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

            ).catch (

                ( ex ) =>
                {
                    reject ( ex );
                }

            );

        } );
    }

    history ( payload ) : Promise< any[] >
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let frame =
            {
                history     : true,
                messageTo   : payload.messageTo
            };

            this.invoke_frame ( frame, this.frameoption () ).then (

                ( value ) =>
                {
                    if ( 200 === value.status )
                    {
                        let data = JSON.parse ( value.data );

                        resolve ( data.result );

                    } else
                    {
                        reject ( `!!! ERROR : Status ${ value.status }` );
                    }
                },
                ( error ) =>
                {
                    reject ( error );
                }

            ).catch (

                ( ex ) =>
                {
                    reject ( ex );
                }

            );

        } );
    }

}

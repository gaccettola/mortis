
import { Injectable, NgZone }   from '@angular/core';

import { Observable }       from 'rxjs/Rx';
import { BehaviorSubject }  from "rxjs/Rx";

import { DataframeBase, IHttpInvokeResult } from './dataframe.base';

import { DatastoreService, IStoreConfig } from './datastore.service';

import * as RSVP            from 'rsvp';

@Injectable()
export class DataframeDesignerTreeItemSetting extends DataframeBase
{
    store_config    : IStoreConfig =
    {
        store_key   : 'designerTreeItemSettingId',
        store_name  : 'designerTreeItemSetting'
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

    frameoption () : any
    {
        let retval : any =
        {
            url_part : 'designerTreeItemSetting',
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

            ).catch (

                ( ex ) =>
                {
                    reject ( ex );
                }

            );

        } );
    }

}

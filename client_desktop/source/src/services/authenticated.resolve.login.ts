// authenticated.resolve.ts

import { Injectable }       from '@angular/core';
import { Resolve }          from '@angular/router';
import { DataframeAccount } from './dataframe.account.service';

@Injectable()
export class AuthenticatedResolveLogin implements Resolve<any>
{
    constructor ( private _dataframeAccount : DataframeAccount )
    {
    }

    resolve ( )
    {
        return new Promise ( ( resolve, reject ) =>
        {
            this._dataframeAccount.read ( ).then (

                ( value ) =>
                {
                    resolve ( value );
                },
                ( error ) =>
                {
                    resolve ( false );
                }

            );

        } );

    }

}

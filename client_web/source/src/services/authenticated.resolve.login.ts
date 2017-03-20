// authenticated.resolve.ts

import { Injectable }                       from '@angular/core';
import { Resolve, ActivatedRouteSnapshot }  from '@angular/router';
import { DataframeAccount }                 from './dataframe.account.service';
import { RouteService  }                    from './route.service';

@Injectable()
export class AuthenticatedResolveLogin implements Resolve<any>
{
    constructor ( private _dataframeAccount : DataframeAccount
                , private _routeService     : RouteService )
    {
    }

    resolve ( )
    {
        return new Promise ( ( resolve, reject ) =>
        {
            console.log ( `AuthenticatedResolveLogin::canActivate` );

            this._dataframeAccount.read ( ).then (

                ( value ) =>
                {
                    setTimeout ( () =>
                    {
                        resolve ( value );

                    }, 3000 );

                },
                ( error ) =>
                {
                    console.log ( `AuthenticatedResolveLogin::canActivate error -`, error );

                    resolve ( false );
                }

            );

        } );

    }

}

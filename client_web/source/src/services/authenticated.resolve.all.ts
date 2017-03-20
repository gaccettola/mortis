// authenticated.resolve.ts

import { Injectable }                       from '@angular/core';
import { Resolve, ActivatedRouteSnapshot }  from '@angular/router';
import { DataframeAccount }                 from './dataframe.account.service';
import { RouteService  }                    from './route.service';

@Injectable()
export class AuthenticatedResolveAll implements Resolve<any>
{
    constructor ( private _dataframeAccount : DataframeAccount
                , private _routeService     : RouteService )
    {
    }

    resolve ( )
    {
        return new Promise ( ( resolve, reject ) =>
        {
            console.log ( `AuthenticatedResolveAll::canActivate` );

            this._dataframeAccount.read ( ).then (

                ( value ) =>
                {
                    resolve ( value );
                },
                ( error ) =>
                {
                    console.log ( `AuthenticatedResolveAll::canActivate error -`, error );

                    resolve ( false );
                }

            );

        } );

    }

}

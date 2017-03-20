// authenticated.guard.ts

import { Injectable }       from '@angular/core';
import { CanActivate }      from '@angular/router';
import { DataframeAccount } from './dataframe.account.service';
import { RouteService  }    from './route.service';

@Injectable()
export class AuthenticatedGuardLogin implements CanActivate
{
    constructor ( private _dataframeAccount : DataframeAccount
                , private _routeService     : RouteService )
    {
    }

    canActivate ( )
    {
        return new Promise ( ( resolve, reject ) =>
        {
            this._dataframeAccount.read ( ).then (

                ( value ) =>
                {
                    if ( true === this._dataframeAccount.isvalid_account ( value ) )
                    {
                        this._dataframeAccount.set_account_token ( value );

                        this._routeService.transition_to ( { href : `/dashboard` } );

                        resolve ( false );

                    } else
                    {
                        resolve ( true );
                    }

                },
                ( error ) =>
                {
                    resolve ( true );
                }

            );

        } );

    }

}

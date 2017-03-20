// authenticated.guard.all.ts

import { Injectable }       from '@angular/core';
import { CanActivate }      from '@angular/router';
import { DataframeAccount } from './dataframe.account.service';
import { RouteService  }    from './route.service';

@Injectable()
export class AuthenticatedGuardAll implements CanActivate
{
    constructor ( private _dataframeAccount : DataframeAccount
                , private _routeService     : RouteService )
    {
    }

    // if anything besides `login` redirect to `login` unless
    // the account can be read
    // the account looks valid
    // the server says the account is good

    canActivate ( )
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let token_val;

            this._dataframeAccount.read ( ).then (

                ( value ) =>
                {
                    token_val = value;

                    if ( true === this._dataframeAccount.isvalid_account ( value ) )
                    {
                        let payload =
                        {
                            userName : value.result.userName,
                            token    : value.result.token
                        };

                        return this._dataframeAccount.check ( payload );

                    } else
                    {
                        throw ( '! isvalid_account' );
                    }

                },
                ( error ) =>
                {
                    throw ( '! _dataframeAccount.read -', error );
                }

            ).then (

                ( value ) =>
                {
                    this._dataframeAccount.set_account_token ( token_val );

                    resolve ( true );
                },
                ( error ) =>
                {
                    throw ( '! _dataframeAccount.check -', error );
                }

            ).catch (

                ( ex ) =>
                {
                    this._dataframeAccount.set_account_token ( null );

                    this._routeService.transition_to ( { href : `/login` } );

                    resolve ( false );
                }

            );

        } );

    }

}

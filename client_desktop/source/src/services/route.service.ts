
import { Injectable }   from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Router }       from '@angular/router';

import { DataframeAccount } from '../services/dataframe.account.service';

@Injectable()
export class RouteService
{
    listof_menu_item            : any[]   = [];
    account_token_subscription  : Subscription;

    constructor ( private _dataframeAccount : DataframeAccount,
                  private _router           : Router )
    {
        this.account_token_subscription = this._dataframeAccount.observe_account_token ( ).subscribe (

            value =>
            {
                if ( null === value )
                {
                    this.transition_to ( { href : `/login` } );
                }

            }

        );
    }

    get_listof_menu_item ( ) : any[]
    {
        this.listof_menu_item = [];

        this.listof_menu_item.push (

            {
                id   : 1,
                icon : `dashboard`,
                href : `/dashboard`,
                name : `Home`
            },
            {
                id   : 2,
                icon : `mail`,
                href : `/mail`,
                name : `Messages`
            },
            {
                id   : 3,
                icon : `device_hub`,
                href : `/designer`,
                name : `Designer`
            },
            {
                id   : 4,
                icon : `settings`,
                href : `/settings`,
                name : `Settings`
            },

        );

        return this.listof_menu_item;
    }

    get_menu_item_logoff ( ) : any
    {
        return {
            id   : -1,
            icon : `power_settings_new`,
            href : `/login`,
            name : `logout`
        };
    }

    get_menu_item_count ( ) : number
    {
        let retval = 1; // there is always a logoff

        retval += this.get_listof_menu_item ( ).length;

        return retval;
    }

    transition_to ( route_url : any ) : void
    {
        if ( ! route_url )
            return;


        if ( ! route_url.href )
            return;


        // if `logout` is the request
        // then go to the login page
        if ( `/login` === route_url.href )
        {
            this._router.navigateByUrl ( route_url.href, { skipLocationChange: true } );

            return;
        }

        // if we get a request to go to the same route
        if ( this._router.url === route_url.href )
        {
            console.log ( `skipping duplicate route` );

            return;
        }

        this._router.navigateByUrl ( route_url.href, { skipLocationChange: true } );
    }

}

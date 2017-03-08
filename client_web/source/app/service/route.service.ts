
import { Injectable }   from '@angular/core';
import { Router }       from '@angular/router';

@Injectable()
export class RouteService
{
    listof_menu_item:       any[]   = [];

    constructor ( private router : Router )
    {
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
                icon : `flag`,
                href : `/flag`,
                name : `Audit`
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
            href : `/logout`,
            name : `logout`
        };
    }

    transition_to ( route_url : any ) : void
    {
        if ( ! route_url )
            return;


        if ( ! route_url.href )
            return;


        // if `logout` is the request
        // then go do the logout thing(s)
        if ( `/logout` === route_url.href )
        {
            console.log ( `do the logout thing` );

            return;
        }

        // if we get a request to go to the same route
        // then go fish
        if ( this.router.url === route_url.href )
        {
            console.log ( `skipping the route thing` );

            return;
        }

        // if we`re on the default route and are
        // requested to go to the default route.  go fish
        if ( `/` === this.router.url && `/dashboard` === route_url.href )
        {
            console.log ( `skipping the route thing, electric boogaloo` );

            return;
        }

        this.router.navigateByUrl ( route_url.href, { skipLocationChange: true } );
    }

}

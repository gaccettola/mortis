import { Injectable }       from '@angular/core';
import { Observable }       from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SidebarService
{
    listof_menu_item:       any[]   = [];

    constructor ( )
    {
    }

    get_listof_menu_item ( ) : any[]
    {
        this.listof_menu_item = [];

        this.listof_menu_item.push (

            {
                id   : 1,
                icon : `dashboard`,
                name : `Home`
            },
            {
                id   : 2,
                icon : `mail`,
                name : `Messages`
            },
            {
                id   : 3,
                icon : `flag`,
                name : `Audit`
            },
            {
                id   : 4,
                icon : `settings`,
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
            name : `logout`
        };
    }

}

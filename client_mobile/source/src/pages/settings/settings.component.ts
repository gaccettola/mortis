
import { Component }    from '@angular/core';

import { App }          from 'ionic-angular';

@Component (
{
    selector    : 'settings'
,   templateUrl : 'settings.component.html'
} )
export class SettingsComponent
{
    title           : string    = 'settings';

    listof_thing    : any       =
    [
        { name : 'a' }
    ,   { name : 'a' }
    ,   { name : 'a' }
    ,   { name : 'a' }
    ];

    constructor ( public app : App )
    {
        console.log ( `::ctor` );
    }

    ionViewDidLoad ( )
    {
        console.log ( `::ionViewDidLoad` );
    }

}

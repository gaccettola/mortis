
import { Component }    from '@angular/core';

import { App }          from 'ionic-angular';

@Component (
{
    selector    : 'flag'
,   templateUrl : 'flag.component.html'
} )
export class FlagComponent
{
    title           : string    = 'flag';

    listof_thing    : any       =
    [
        { name : 'a' }
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

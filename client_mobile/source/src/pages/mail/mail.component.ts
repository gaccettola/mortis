
import { Component }    from '@angular/core';

import { App }          from 'ionic-angular';

@Component (
{
    selector    : 'mail'
,   templateUrl : 'mail.component.html'
} )
export class MailComponent
{
    title           : string    = 'mail';

    listof_thing    : any       =
    [
        { name : 'a' }
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

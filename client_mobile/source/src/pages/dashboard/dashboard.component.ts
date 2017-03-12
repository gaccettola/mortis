
import { Component }        from '@angular/core';
import { App }              from 'ionic-angular';

import { SocketService }    from '../../services/socket.service';

@Component (
{
    selector    : 'dashboard'
,   templateUrl : 'dashboard.component.html'
} )
export class DashboardComponent
{
    title           : string    = 'dashboard';

    listof_thing    : any       =
    [
        { name : 'a' }
    ];

    constructor ( public app            : App,
                  private socketService : SocketService )
    {
        console.log ( `::ctor` );
    }

    ionViewDidLoad ( )
    {
        console.log ( `::ionViewDidLoad` );

        this.socketService.engine_init ( );
    }

}

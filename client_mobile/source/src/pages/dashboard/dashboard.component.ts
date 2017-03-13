
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


    //
    // Runs when the page has loaded. This event only happens once per page being created.
    // If a page leaves but is cached, then this event will not fire again on a subsequent viewing.
    // The ionViewDidLoad event is good place to put your setup code for the page.
    //
    ionViewDidLoad ( ) : void
    {
        console.log ( `::ionViewDidLoad` );

        this.socketService.engine_init ( );
    }

    //
    // Runs when the page is about to enter and become the active page.
    //
    ionViewWillEnter ( ) : void
    {
        console.log ( `::ionViewWillEnter` );
    }

    //
    // Runs when the page has fully entered and is now the active page.
    // This event will fire, whether it was the first load or a cached page.
    //
    ionViewDidEnter ( ) : void
    {
        console.log ( `::ionViewDidEnter` );
    }

    //
    // Runs when the page is about to leave and no longer be the active page.
    //
    ionViewWillLeave ( ) : void
    {
        console.log ( `::ionViewWillLeave` );
    }

    //
    // Runs when the page has finished leaving and is no longer the active page.
    //
    ionViewDidLeave ( ) : void
    {
        console.log ( `::ionViewDidLeave` );
    }

    //
    // Runs when the page is about to be destroyed and have its elements removed.
    //
    ionViewWillUnload ( ) : void
    {
        console.log ( `::ionViewWillUnload` );
    }

    //
    // Runs before the view can enter. This can be used as a sort of "guard" in authenticated
    // views where you need to check permissions before the view can enter
    //
    ionViewCanEnter ( ) : boolean
    {
        console.log ( `::ionViewCanEnter` );

        return true;
    }

    //
    // Runs before the view can leave. This can be used as a sort of "guard" in authenticated
    // views where you need to check permissions before the view can leave
    //
    ionViewCanLeave ( ) : boolean
    {
        console.log ( `::ionViewCanLeave` );

        return true;
    }

    on_select_card ( )
    {
        console.log ( `::ionViewDidLoad` );

        this.socketService.engine_init ( );
    }

}

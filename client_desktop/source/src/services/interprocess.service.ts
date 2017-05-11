
import { Injectable, OnInit } from '@angular/core';

declare var electron: any;

@Injectable()
export class InterprocessService
{
    constructor ( )
    {
        this.verify_init ( );
    }

    verify_init ( ) : boolean
    {
        let retval = true;

        electron.ipcRenderer.on ( 'asynchronous-reply', function ( event, arg )
        {
            console.log ( 'asynchronous-reply', arg ); // prints "pong"

        } );

        return retval;
    }


    send_data_sync ( payload : any ) : void
    {
        let retval = electron.ipcRenderer.sendSync ( 'ngEvent_sync', payload );

        if ( retval )
        {
            console.log ( 'synchronous-reply', retval );
        }
    }

    send_data_async ( payload : any ) : void
    {
        electron.ipcRenderer.send ( 'ngEvent_async', payload );
    }

}


import { Injectable }           from '@angular/core';
import { Observable }           from 'rxjs/Rx';
import { BehaviorSubject }      from "rxjs/Rx";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


declare var window: any;

@Injectable()
export class SocketService
{
    server_socket_url :string   = 'ws://localhost:8989';

    primus_client               :any;
    primus_socket_options       :any =
    {
        manual      : true,
        reconnect   :
        {
            max     : Infinity  // Number: The max delay before we try to reconnect.
        ,   min     : 500       // Number: The minimum delay before we try reconnect.
        ,   retries : 10        // Number: How many times we should try to reconnect.
        }
    };

    constructor ( )
    {

    }

    engine_init () : void
    {
        console.log ( '::engine_init' );

        this.primus_client = new window.Primus ( this.server_socket_url, this.primus_socket_options );

        this.primus_client.on ( 'data',                 this.on_primus_client_data                  );

        this.primus_client.on ( 'open',                 this.on_primus_client_open                  );

        this.primus_client.on ( 'error',                this.on_primus_client_error                 );

        this.primus_client.on ( 'reconnect',            this.on_primus_client_reconnect             );

        this.primus_client.on ( 'reconnect scheduled', this.on_primus_client_reconnect_scheduled    );

        this.primus_client.on ( 'reconnected',          this.on_primus_client_reconnected           );

        this.primus_client.on ( 'reconnect timeout',    this.on_primus_client_reconnect_timeout     );

        this.primus_client.on ( 'reconnect failed',     this.on_primus_client_reconnect_failed      );

        this.primus_client.on ( 'end',                  this.on_primus_client_end                   );

        this.primus_client.on ( 'destroy',              this.on_primus_client_destroy               );

        this.primus_client.open ( );

        console.log ( '::engine_init -', this.primus_client );

    }

    on_primus_client_data ( data : any )
    {
        console.log ( 'Received a new message from the server', data );
    }

    on_primus_client_open ( )
    {
        console.log ( 'Connection is alive and kicking' );
    }

    on_primus_client_error ( err : any )
    {
        console.error ( 'Something horrible has happened', err.stack );
    }

    on_primus_client_reconnect ( opts : any )
    {
        console.log ( 'Reconnection attempt started' );
    }

    on_primus_client_reconnect_scheduled ( opts : any )
    {
        console.log ( 'Reconnecting in %d ms', opts.scheduled );

        console.log ( 'This is attempt %d out of %d', opts.attempt, opts.retries );
    }

    on_primus_client_reconnected ( opts : any )
    {
        console.log ( 'It took %d ms to reconnect', opts.duration );
    }

    on_primus_client_reconnect_timeout ( err : any, opts : any )
    {
        console.log ( 'Timeout expired: %s', err.message );
    }

    on_primus_client_reconnect_failed ( err : any, opts : any  )
    {
        console.log ( 'The reconnection failed: %s', err.message );
    }

    on_primus_client_end ( )
    {
        console.log ( 'Connection closed' );
    }

    on_primus_client_destroy ( )
    {
        console.log ( 'Feel the power of my lasers!' );
    }

}


import { Injectable, NgZone }   from '@angular/core';
import { Observable }           from 'rxjs/Rx';
import { BehaviorSubject }      from "rxjs/Rx";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare var window: any;

@Injectable()
export class SocketService
{
    server_socket_url :string   = 'ws://192.168.1.99:8989';
    // server_socket_url :string   = 'ws://localhost:8989';

    primus_client               : any;
    primus_socket_options       : any =
    {
        manual      : true,
        reconnect   :
        {
            max     : Infinity  // Number: The max delay before we try to reconnect.
        ,   min     : 500       // Number: The minimum delay before we try reconnect.
        ,   retries : 10        // Number: How many times we should try to reconnect.
        }
    };

    primus_client_event_count   : number = 0;

    constructor ( private _ngZone : NgZone )
    {
    }

    // Primus.OPENING = 1;  // We're opening the connection.
    // Primus.CLOSED  = 2;  // No active connection.
    // Primus.OPEN    = 3;  // The connection is open.

    engine_init ( ) : void
    {
        console.log ( `SocketService::engine_init` );

        if ( ! this.can_init ( ) )
        {
            console.log ( `SocketService::engine_init - not duplicating already { OPEN | OPENING }` );

            return;
        }

        console.log ( `creating socket connection` );

        this.primus_client = new window.Primus ( this.server_socket_url, this.primus_socket_options );

        this.primus_client.on ( 'data',                 ( data : any ) => this._ngZone.run ( ( ) =>
        {
            console.log ( 'Received a new message from the server', data );

            this.primus_client_event_count++;

            console.log ( 'primus event', this.primus_client_event_count );

        } ) );

        this.primus_client.on ( 'open',                 ( ) => this._ngZone.run ( ( ) =>
        {
            console.log ( 'Connection is alive and kicking' );

            this.primus_client_event_count++;

            console.log ( 'primus event', this.primus_client_event_count );

        } ) );

        this.primus_client.on ( 'error',                ( err : any ) => this._ngZone.run ( ( ) =>
        {
            console.error ( 'Something horrible has happened', err.stack );

            this.primus_client_event_count++;

            console.log ( 'primus event', this.primus_client_event_count );

        } ) );

        this.primus_client.on ( 'reconnect',            ( opts : any ) => this._ngZone.run ( ( ) =>
        {
            console.log ( 'Reconnection attempt started' );

            this.primus_client_event_count++;

            console.log ( 'primus event', this.primus_client_event_count );

        } ) );

        this.primus_client.on ( 'reconnect scheduled',  ( opts : any ) => this._ngZone.run ( ( ) =>
        {
            console.log ( 'Reconnecting in %d ms', opts.scheduled );

            console.log ( 'This is attempt %d out of %d', opts.attempt, opts.retries );

            this.primus_client_event_count++;

            console.log ( 'primus event', this.primus_client_event_count );

        } ) );

        this.primus_client.on ( 'reconnected',          ( opts : any ) => this._ngZone.run ( ( ) =>
        {
            console.log ( 'It took %d ms to reconnect', opts.duration );

            this.primus_client_event_count++;

            console.log ( 'primus event', this.primus_client_event_count );

        } ) );

        this.primus_client.on ( 'reconnect timeout',    ( err : any, opts : any ) => this._ngZone.run ( ( ) =>
        {
            console.log ( 'Timeout expired: %s', err.message );

            this.primus_client_event_count++;

            console.log ( 'primus event', this.primus_client_event_count );

        } ) );

        this.primus_client.on ( 'reconnect failed',     ( err : any, opts : any ) => this._ngZone.run ( ( ) =>
        {
            console.log ( 'The reconnection failed: %s', err.message );

            this.primus_client_event_count++;

            console.log ( 'primus event', this.primus_client_event_count );

        } ) );

        this.primus_client.on ( 'end',                  ( ) => this._ngZone.run ( ( ) =>
        {
            console.log ( 'Connection closed' );

            this.primus_client_event_count++;

            console.log ( 'primus event', this.primus_client_event_count );

        } ) );

        this.primus_client.on ( 'destroy',              ( ) => this._ngZone.run ( ( ) =>
        {
            console.log ( 'Feel the power of my lasers!' );

            this.primus_client_event_count++;

            console.log ( 'primus event', this.primus_client_event_count );

        } ) );

        this.primus_client.open ( );

    }

    can_init () : boolean
    {
        let retval = true;

        // safe to open if there is no `this.primus_client`
        if ( ! this.primus_client )
            return retval;

        // safe to open if there is no `this.primus_client.readyState`
        if ( ! this.primus_client.readyState )
            return retval;

        // NOT safe to open if this.primus_client.readyState === Primus.OPENING
        if ( 1 === this.primus_client.readyState )
            retval = false;

        // NOT safe to open if this.primus_client.readyState === Primus.OPEN
        if ( 3 === this.primus_client.readyState )
            retval = false;

        return retval;
    }

}

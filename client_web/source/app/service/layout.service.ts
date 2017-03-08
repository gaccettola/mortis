
import { Injectable }           from '@angular/core';
import { Observable }           from 'rxjs/Rx';
import { BehaviorSubject }      from "rxjs/Rx";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


declare var window: any;

@Injectable()
export class LayoutService
{
    content_height  :   string = '';
    current_height  :   number  = 0;
    content         = new BehaviorSubject( this.current_height );

    constructor ( )
    {
        Observable
            .fromEvent ( window, 'resize' )
            .debounceTime ( 200 )
            .subscribe( ( event ) =>
            {
                this.resizeFn ( event );

            } );

        this.current_height = window.innerHeight;

        this.resizeFn ( null );
    }

    get_content_height ( ) : string
    {
        return this.content_height;
    }

    get_current_height ( ) : number
    {
        return this.current_height;
    }

    get_content ( ) : Observable<number>
    {
        return this.content.asObservable();
    }

    private resizeFn ( e: any )
    {
        let adjusted_height: number = e ? e.target.innerHeight : this.current_height;

        adjusted_height -= 48;  // minus the header
        adjusted_height -= 24;  // minus the footer

        if ( 1 > adjusted_height ) adjusted_height = 240;

        this.current_height = adjusted_height;

        this.content_height = `${adjusted_height}px`;

        this.content.next ( adjusted_height );
    }

}

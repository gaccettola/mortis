
import { Injectable }           from '@angular/core';
import { Observable }           from 'rxjs/Rx';
import { BehaviorSubject }      from "rxjs/Rx";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as _                   from 'lodash';

declare var window      : any;
declare var document    : any;

@Injectable()
export class MouseService
{
    content_current :   string = '';
    current_idx     :   number = -1;

    content_subject = new BehaviorSubject( this.content_current );

    constructor ( )
    {
    }

    get_content_current ( ) : string
    {
        return this.content_current;
    }

    get_element_idx ( event ) : number
    {
        let retval = -1;

        if ( document.elementFromPoint ( event.clientX, event.clientY ) )
        {
            let ele = document.elementFromPoint ( event.clientX, event.clientY );

            if ( ele && ele.id )
            {
                retval = ele.id;

            } else
            {
                retval = -1;
            }
        }

        return retval;
    }

    get_current_idx ( ) : number
    {
        return this.current_idx;
    }

    observe_content_current ( ) : Observable<string>
    {
        return this.content_subject.asObservable();
    }

    on_mousedown ( event ) : string
    {
        return this.get_element_type ( event );
    }

    on_mousemove ( event ) : string
    {
        let retval = this.get_element_type ( event );

        if ( this.content_current !== retval )
        {
            this.content_current = retval;

            this.content_subject.next ( this.content_current );
        }

        return retval;

    }

    on_mouseup ( event ) : string
    {
        return this.get_element_type ( event );
    }

    get_element_type ( event ) : string
    {
        if ( document.elementFromPoint ( event.clientX, event.clientY ) )
        {
            let ele = document.elementFromPoint ( event.clientX, event.clientY );

            if ( ele && ele.id )
            {
                this.current_idx = ele.id;

            } else
            {
                this.current_idx = -1;
            }

            let typ = 'canvas';

            if ( ele && ele.className && ele.className.baseVal && 'flow-host-main' === ele.className.baseVal )
            {
                typ = 'canvas';

            } else if ( ele && ele.className && ele.className.baseVal )
            {

                if ( _.includes ( ele.className.baseVal, 'flow-item-connection' ) &&
                     _.includes ( ele.className.baseVal, 'flow-item-connection-selected' ) )
                {
                    typ = 'flow-item-connection-selected';

                    return typ;
                }

                if (  _.includes ( ele.className.baseVal, 'flow-item-connection' ) &&
                    ! _.includes ( ele.className.baseVal, 'flow-item-connection-selected' ) )
                {
                    typ = 'flow-item-connection';

                    return typ;
                }


                if ( _.includes ( ele.className.baseVal, 'flow-item-connector' ) &&
                     _.includes ( ele.className.baseVal, 'flow-item-connector-selected' ) )
                {
                    typ = 'flow-item-connector-selected';

                    return typ;
                }


                if (  _.includes ( ele.className.baseVal, 'flow-item-connector' ) &&
                    ! _.includes ( ele.className.baseVal, 'flow-item-connector-selected' ) )
                {
                    typ = 'flow-item-connector';

                    return typ;
                }


                if ( _.includes ( ele.className.baseVal, 'flow-item' ) &&
                     _.includes ( ele.className.baseVal, 'flow-item-selected' ) )
                {
                    typ = 'flow-item-selected';

                    return typ;
                }


                if (  _.includes ( ele.className.baseVal, 'flow-item' ) &&
                    ! _.includes ( ele.className.baseVal, 'flow-item-selected' ) )
                {
                    typ = 'flow-item';

                    return typ;
                }

                typ = 'unmapped';

            }

            return typ;

        } else
        {
            return 'null';
        }
    }

}

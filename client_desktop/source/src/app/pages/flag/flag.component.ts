
import { Component, OnInit }    from '@angular/core';
import { Subscription }         from 'rxjs/Subscription';
import { LayoutService  }       from '../../services/layout.service';

@Component (
{
    selector    : 'flag'
,   templateUrl : './flag.component.html'
,   styleUrls   : ['./flag.component.css']
} )
export class FlagComponent implements OnInit
{
    current_height:         string;
    subscription:           Subscription;

    constructor ( private _layoutService : LayoutService )
    {
    }

    ngOnInit ( ) : void
    {
        this.subscription = this._layoutService.observe_content_height ( ).subscribe (

            value => { this.resizeFn ( ); }

        );
    }

    private resizeFn ( )
    {
        this.current_height = this._layoutService.get_content_height ( );
    }

}


import { Component, OnInit }    from '@angular/core';
import { Subscription }         from 'rxjs/Subscription';
import { LayoutService  }       from '../../service/layout.service';

@Component (
{
    moduleId        : module.id
,   selector        : 'flag'
,   templateUrl     : 'flag.component.html'
,   styleUrls       : ['flag.component.css']
} )
export class FlagComponent implements OnInit
{
    current_height:         string;
    subscription:           Subscription;

    constructor ( private layoutService  : LayoutService )
    {
    }

    ngOnInit ( ) : void
    {
        this.subscription = this.layoutService.observe_content_height ( ).subscribe (

            value => { this.resizeFn ( ); }

        );
    }

    private resizeFn ( )
    {
        this.current_height = this.layoutService.get_content_height ( );
    }

}

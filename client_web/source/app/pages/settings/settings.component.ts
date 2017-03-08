
import { Component, OnInit }    from '@angular/core';
import { Subscription }         from 'rxjs/Subscription';
import { LayoutService  }       from '../../service/layout.service';

@Component (
{
    moduleId        : module.id
,   selector        : 'settings'
,   templateUrl     : 'settings.component.html'
,   styleUrls       : ['settings.component.scss']
} )
export class SettingsComponent implements OnInit
{
    current_height:         string;
    subscription:           Subscription;

    constructor ( private layoutService  : LayoutService )
    {
    }

    ngOnInit ( ) : void
    {
        this.subscription = this.layoutService.get_content().subscribe (

            value => { this.resizeFn ( ); }

        );
    }

    private resizeFn ( )
    {
        this.current_height = this.layoutService.get_content_height ( );
    }

}

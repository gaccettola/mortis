
import { Component, OnInit }    from '@angular/core';
import { Subscription }         from 'rxjs/Subscription';
import { LayoutService  }       from '../../services/layout.service';

@Component (
{
    selector    : 'settings'
,   templateUrl : './settings.component.html'
,   styleUrls   : ['./settings.component.css']
} )
export class SettingsComponent implements OnInit
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

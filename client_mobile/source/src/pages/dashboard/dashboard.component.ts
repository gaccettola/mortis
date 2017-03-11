
import { Component }        from '@angular/core';

import { App, ItemSliding } from 'ionic-angular';

@Component (
{
    selector    : 'dashboard'
,   templateUrl : 'dashboard.component.html'
} )
export class DashboardComponent
{
    title           : string    = 'hello';

    dayIndex        : number    = 0;
    queryText       : string    = '';
    segment         : string    = 'all';
    excludeTracks   : any       = [];
    shownSessions   : any       = [];
    groups          : any       = [];
    confDate        : string;

    thingthing      : any       =
    [
        { name : 'a' }
    ,   { name : 'a' }
    ,   { name : 'a' }
    ,   { name : 'a' }
    ,   { name : 'a' }
    ,   { name : 'a' }
    ,   { name : 'a' }
    ,   { name : 'a' }
    ,   { name : 'a' }
    ,   { name : 'a' }
    ,   { name : 'a' }
    ,   { name : 'a' }
    ,   { name : 'a' }
    ];

    constructor ( public app : App )
    {
        console.log ( `::ctor` );
    }

    ionViewDidLoad ( )
    {
        console.log ( `::ionViewDidLoad` );

        this.app.setTitle ( this.title );

        this.updateSchedule ( );
    }

    updateSchedule ( )
    {
        console.log ( `::updateSchedule` );
    }

    presentFilter ( )
    {
        console.log ( `::presentFilter` );
    }

    goToSessionDetail ( sessionData: any )
    {
        console.log ( `::goToSessionDetail` );
    }

    addFavorite ( slidingItem: ItemSliding, sessionData: any )
    {
        console.log ( `::addFavorite` );
    }

    removeFavorite ( slidingItem: ItemSliding, sessionData: any, title: string )
    {
        console.log ( `::removeFavorite` );
    }

}

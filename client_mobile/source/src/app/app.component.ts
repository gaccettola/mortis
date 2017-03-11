
import { Component, OnInit, ViewChild }             from '@angular/core';

import { Events, MenuController, Nav, Platform }    from 'ionic-angular';
import { Splashscreen }                             from 'ionic-native';
import { Storage }                                  from '@ionic/storage';

import { FooterComponent }      from '../pages/footer/footer.component';

import { DashboardComponent }   from '../pages/dashboard/dashboard.component';

export interface PageInterface
{
    title         : string;
    component     : any;
    icon          : string;
    logsOut?      : boolean;
    index?        : number;
    tabComponent? : any;
}

@Component (
{
    selector    : 'app-root'
,   templateUrl : './app.component.html'
} )
export class AppComponent implements OnInit
{
    // ////////////////////////////////////////////////////////////////////////
    //
    // the root nav is a child of the root app component
    // @ViewChild(Nav) gets a reference to the app's root nav

    @ViewChild ( Nav ) nav: Nav;

    // ////////////////////////////////////////////////////////////////////////
    //
    //

    appPages      : PageInterface[] =
    [
        {
            title        : 'Dashboard',
            component    : FooterComponent,
            icon         : 'calendar',
            tabComponent : DashboardComponent
        }
    ];

    rootPage: any;

    constructor ( public events     : Events
                , public menu       : MenuController
                , public platform   : Platform
                , public storage    : Storage )
    {
        console.log ( `::ctor` );

        this.rootPage = FooterComponent;

        this.platformReady ( );

        this.enableMenu ( );
    }

    // ////////////////////////////////////////////////////////////////////////
    //
    //

    ngOnInit ( ) : void
    {
        console.log ( `::ngOnInit` );
    }

    // ////////////////////////////////////////////////////////////////////////
    //
    //

    enableMenu ( )
    {
        console.log ( `::enableMenu` );

        let loggedIn = true;

        this.menu.enable ( loggedIn, 'loggedInMenu' );
    }

    // ////////////////////////////////////////////////////////////////////////
    //
    // call any initial plugins when ready

    platformReady ( )
    {
        console.log ( `::enableMenu` );

        this.platform.ready().then ( () =>
        {
            console.log ( `::enableMenu - platform.ready` );

            Splashscreen.hide();

        } );
    }

    // ////////////////////////////////////////////////////////////////////////
    //
    //

    openPage ( page : any )
    {
        console.log ( `::openPage`, page );

        // the nav component was found using @ViewChild(Nav)
        // reset the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario

        // if ( page.index )
        // {
        //     this.nav.setRoot ( page.component, { tabIndex : page.index } );
        //
        // } else
        // {
        //     this.nav.setRoot ( page.component ).catch( () =>
        //     {
        //         console.log ( "Didn't set nav root" );
        //
        //     } );
        // }

        setTimeout ( () =>
        {
            console.log ( 'dood' );

        }, 1000 );

    }

    // ////////////////////////////////////////////////////////////////////////
    //
    //

    isActive ( page : any )
    {
        console.log ( `::isActive`, page );

        return 'primary';
    }

}

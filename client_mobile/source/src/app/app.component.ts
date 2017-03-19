
import { Component, OnInit, ViewChild }     from '@angular/core';

import { App, Events, MenuController }      from 'ionic-angular';
import { Nav, Platform }                    from 'ionic-angular';
import { Splashscreen }                     from 'ionic-native';
import { Storage }                          from '@ionic/storage';

import { DataframeAccount }     from '../services/dataframe.account.service';

import { LoginComponent }       from '../pages/login/login.component';
import { DashboardComponent }   from '../pages/dashboard/dashboard.component';
import { FlagComponent }        from '../pages/flag/flag.component';
import { MailComponent }        from '../pages/mail/mail.component';
import { SettingsComponent }    from '../pages/settings/settings.component';

export interface PageInterface
{
    id          : number,
    title       : string;
    icon        : string;
    logsOut?    : boolean;
    index?      : number;
    component?  : any;
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

    appPages : PageInterface [] =
    [
        {
            id          : 1,
            title       : 'Dashboard',
            icon        : 'md-home',
            component   : DashboardComponent
        },
        {
            id          : 2,
            title       : 'Flag',
            icon        : 'md-home',
            component   : FlagComponent
        },
        {
            id          : 3,
            title       : 'Mail',
            icon        : 'md-home',
            component   : MailComponent
        },
        {
            id          : 4,
            title       : 'Settings',
            icon        : 'md-home',
            component   : SettingsComponent
        },
        {
            id          : -1,
            title       : 'Logout',
            icon        : 'md-power',
            component   : LoginComponent
        }
    ];

    rootPage: any;

    constructor ( private _app              : App
                , private _events           : Events
                , private _menu             : MenuController
                , private _platform         : Platform
                , private _storage          : Storage
                , private _dataframeAccount : DataframeAccount )
    {
        console.log ( `::ctor` );

        this.rootPage = LoginComponent;

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

        this._menu.enable ( loggedIn, 'loggedInMenu' );
    }

    // ////////////////////////////////////////////////////////////////////////
    //
    // call any initial plugins when ready

    platformReady ( )
    {
        console.log ( `::enableMenu` );

        this._platform.ready().then ( () =>
        {
            console.log ( `::enableMenu - platform.ready` );

            Splashscreen.hide();

        } );
    }

    // ////////////////////////////////////////////////////////////////////////
    //
    //

    openPage ( page : PageInterface )
    {
        console.log ( `::openPage`, page );

        if ( -1 === page.id )
        {
            this._dataframeAccount.logout ( );

            this.nav.setRoot ( page.component ).catch( () =>
            {
                console.log ( "Didn't set nav root" );

            } );

        } else
        {
            this.nav.setRoot ( page.component ).catch( () =>
            {
                console.log ( "Didn't set nav root" );

            } );

        }

    }

    // ////////////////////////////////////////////////////////////////////////
    //
    //

    isActive ( page : any )
    {
        // console.log ( `::isActive`, page );

        let childNav = this.nav.getActiveChildNav ( );

        // Tabs are a special case because they have their own navigation

        if ( childNav )
        {
            if ( childNav.getSelected() && childNav.getSelected().root === page.tabComponent )
            {
                return 'primary';
            }

            return;
        }

        if ( this.nav.getActive() && this.nav.getActive().component === page.component )
        {
            return 'primary';
        }

        return;
    }

}


import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { MaterialModule }       from '@angular/material';
import { FlexLayoutModule }     from '@angular/flex-layout';

import 'hammerjs';

import { AppRouting }           from './core/app.routing';


import { RouteService }         from './service/route.service';
import { LayoutService }        from './service/layout.service';


import { AppComponent }         from './core/app.component';
import { HeaderComponent }      from './core/header/header.component';
import { FooterComponent }      from './core/footer/footer.component';
import { SidebarComponent }     from './core/sidebar/sidebar.component';


import { DashboardComponent }   from './pages/dashboard/dashboard.component';
import { MailComponent }        from './pages/mail/mail.component';
import { FlagComponent }        from './pages/flag/flag.component';
import { SettingsComponent }    from './pages/settings/settings.component';

@NgModule (
{
    declarations    :
    [
        AppComponent
    ,   HeaderComponent
    ,   FooterComponent
    ,   SidebarComponent

    ,   DashboardComponent
    ,   MailComponent
    ,   FlagComponent
    ,   SettingsComponent
    ],
    imports         :
    [
        BrowserModule
    ,   FormsModule
    ,   MaterialModule
    ,   FlexLayoutModule
    ,   AppRouting
    ],
    providers       :
    [
        RouteService
    ,   LayoutService
    ],
    bootstrap       :
    [
        AppComponent
    ]
} )
export class AppModule { }
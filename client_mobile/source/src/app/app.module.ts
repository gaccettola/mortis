
import { NgModule }                 from '@angular/core';

import { IonicApp, IonicModule }    from 'ionic-angular';
import { IonicStorageModule }       from '@ionic/storage';

import { SocketService }            from '../services/socket.service';

import { DataframeBase }            from '../services/dataframe.base';
import { DataframeAccount }         from '../services/dataframe.account.service';

import { AppComponent }             from './app.component';

import { LoginComponent }           from '../pages/login/login.component';
import { DashboardComponent }       from '../pages/dashboard/dashboard.component';
import { FlagComponent }            from '../pages/flag/flag.component';
import { MailComponent }            from '../pages/mail/mail.component';
import { SettingsComponent }        from '../pages/settings/settings.component';

@NgModule (
{
    declarations    :
    [
        AppComponent
    ,   LoginComponent
    ,   DashboardComponent
    ,   FlagComponent
    ,   MailComponent
    ,   SettingsComponent
    ],
    imports         :
    [
        IonicModule.forRoot(AppComponent)
    ,   IonicStorageModule.forRoot()
    ],
    providers       :
    [
        SocketService
    ,   DataframeBase
    ,   DataframeAccount
    ],
    entryComponents :
    [
        AppComponent
    ,   LoginComponent
    ,   DashboardComponent
    ,   FlagComponent
    ,   MailComponent
    ,   SettingsComponent
    ],
    bootstrap       :
    [
        IonicApp
    ]
} )
export class AppModule { }

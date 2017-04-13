
import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { HttpModule }               from '@angular/http';


import { IonicApp, IonicModule }    from 'ionic-angular';
import { IonicStorageModule }       from '@ionic/storage';

import { SocketService }            from '../services/socket.service';

import { DataframeBase }            from '../services/dataframe.base';
import { DataframeAccount }         from '../services/dataframe.account.service';

import { NotifyService }            from '../services/notify.service';
import { DatastoreService }         from '../services/datastore.service';

import { AppComponent }             from './app.component';

import { LoginComponent }           from '../pages/login/login.component';
import { DashboardComponent }       from '../pages/dashboard/dashboard.component';
import { DesignerComponent }        from '../pages/designer/designer.component';
import { MailComponent }            from '../pages/mail/mail.component';
import { SettingsComponent }        from '../pages/settings/settings.component';

import { StatusBar }                from '@ionic-native/status-bar';
import { SplashScreen }             from '@ionic-native/splash-screen';

@NgModule (
{
    declarations    :
    [
        AppComponent
    ,   LoginComponent
    ,   DashboardComponent
    ,   DesignerComponent
    ,   MailComponent
    ,   SettingsComponent
    ],
    imports         :
    [
        IonicModule.forRoot(AppComponent)
    ,   IonicStorageModule.forRoot()
    ,   BrowserModule
    ,   HttpModule
    ],
    providers       :
    [
        StatusBar
    ,   SocketService
    ,   SplashScreen
    ,   DataframeBase
    ,   DataframeAccount
    ,   DatastoreService
    ,   NotifyService
    ],
    entryComponents :
    [
        AppComponent
    ,   LoginComponent
    ,   DashboardComponent
    ,   DesignerComponent
    ,   MailComponent
    ,   SettingsComponent
    ],
    bootstrap       :
    [
        IonicApp
    ]
} )
export class AppModule { }

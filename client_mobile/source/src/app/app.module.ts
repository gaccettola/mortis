
import { NgModule }                 from '@angular/core';

import { IonicApp, IonicModule }    from 'ionic-angular';
import { IonicStorageModule }       from '@ionic/storage';

import { AppComponent }             from './app.component';

import { DashboardComponent }       from '../pages/dashboard/dashboard.component';

@NgModule (
{
    declarations    :
    [
        AppComponent
    ,   DashboardComponent
    ],
    imports         :
    [
        IonicModule.forRoot(AppComponent)
    ,   IonicStorageModule.forRoot()
    ],
    providers       :
    [
    ],
    entryComponents :
    [
        AppComponent
    ,   DashboardComponent
    ],
    bootstrap       :
    [
        IonicApp
    ]
} )
export class AppModule { }

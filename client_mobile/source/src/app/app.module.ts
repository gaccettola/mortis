
import { NgModule }                 from '@angular/core';

import { IonicApp, IonicModule }    from 'ionic-angular';
import { IonicStorageModule }       from '@ionic/storage';

import { AppComponent }             from './app.component';

import { DashboardComponent }       from '../pages/dashboard/dashboard.component';
import { FooterComponent }          from '../pages/footer/footer.component';

@NgModule (
{
    declarations    :
    [
        AppComponent
    ,   DashboardComponent
    ,   FooterComponent
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
    ,   FooterComponent
    ],
    bootstrap       :
    [
        IonicApp
    ]
} )
export class AppModule { }

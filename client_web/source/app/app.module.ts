
import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { MaterialModule }   from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import 'hammerjs';

import { SidebarService }   from './core/sidebar/sidebar.service';

import { AppComponent }     from './core/app.component';
import { HeaderComponent }  from './core/header/header.component';
import { FooterComponent }  from './core/footer/footer.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';

@NgModule( {
    imports      :
    [
        BrowserModule
    ,   FormsModule
    ,   MaterialModule
    ,   FlexLayoutModule
    ],
    declarations :
    [
        AppComponent
    ,   HeaderComponent
    ,   FooterComponent
    ,   SidebarComponent
    ],
    providers    :
    [
        SidebarService
    ],
    bootstrap    :
    [
        AppComponent
    ]
} )
export class AppModule { }
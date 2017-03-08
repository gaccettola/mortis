
import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { MaterialModule }   from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import 'hammerjs';

import { AppComponent }     from './core/app.component';
import { HeaderComponent }  from './core/header/header.component';
import { FooterComponent }  from './core/footer/footer.component';

@NgModule( {
    imports      :
    [
        BrowserModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule
    ],
    declarations :
    [
        AppComponent,
        HeaderComponent,
        FooterComponent,
    ],
    bootstrap    :
    [
        AppComponent
    ]
} )
export class AppModule { }
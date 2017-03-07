
import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { MaterialModule }   from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import 'hammerjs';

import { AppComponent }   from './core/app.component';

@NgModule( {
    imports:      [ BrowserModule, FormsModule, MaterialModule, FlexLayoutModule ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
} )
export class AppModule { }
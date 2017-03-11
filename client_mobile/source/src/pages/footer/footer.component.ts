
import {Component}            from '@angular/core';

import {NavParams}            from 'ionic-angular';

import {DashboardComponent}   from '../dashboard/dashboard.component';

@Component (
{
    templateUrl: 'footer.component.html'
} )
export class FooterComponent
{
    tab1Root: any = DashboardComponent;

    mySelectedIndex: number;

    constructor ( navParams: NavParams )
    {
        this.mySelectedIndex = navParams.data.tabIndex || 0;
    }

}

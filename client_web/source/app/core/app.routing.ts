
import { NgModule }             from '@angular/core';
import { RouterModule }         from '@angular/router';

import { DashboardComponent }   from '../pages/dashboard/dashboard.component';
import { MailComponent }        from '../pages/mail/mail.component';
import { FlagComponent }        from '../pages/flag/flag.component';
import { SettingsComponent }    from '../pages/settings/settings.component';

const appRoutes: any[] =
[
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'mail',
        component: MailComponent
    },
    {
        path: 'flag',
        component: FlagComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: '**',
        component: DashboardComponent
    }
];

@NgModule (
{
    imports :
    [
        RouterModule.forRoot ( appRoutes )
    ]
,   exports :
    [
        RouterModule
    ]
} )
export class AppRouting { }

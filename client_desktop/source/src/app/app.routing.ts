
import { NgModule }             from '@angular/core';
import { RouterModule }         from '@angular/router';

import { LoginComponent }       from '../pages/login/login.component';
import { DashboardComponent }   from '../pages/dashboard/dashboard.component';
import { MailComponent }        from '../pages/mail/mail.component';
import { FlagComponent }        from '../pages/flag/flag.component';
import { SettingsComponent }    from '../pages/settings/settings.component';

import { AuthenticatedGuardAll }     from '../services/authenticated.guard.all';
import { AuthenticatedGuardLogin }   from '../services/authenticated.guard.login';

import { AuthenticatedResolveAll }   from '../services/authenticated.resolve.all';
import { AuthenticatedResolveLogin } from '../services/authenticated.resolve.login';

const appRoutes: any[] =
[
    {
        path        : '',
        component   : LoginComponent,
        canActivate : [ AuthenticatedGuardLogin ],
        resolve     :
        {
            token   : AuthenticatedResolveLogin
        }
    },
    {
        path        : 'dashboard',
        component   : DashboardComponent,
        canActivate : [ AuthenticatedGuardAll ],
        resolve     :
        {
            token   : AuthenticatedResolveAll
        }
    },
    {
        path        : 'mail',
        component   : MailComponent,
        canActivate : [ AuthenticatedGuardAll ],
        resolve     :
        {
            token   : AuthenticatedResolveAll
        }
    },
    {
        path        : 'flag',
        component   : FlagComponent,
        canActivate : [ AuthenticatedGuardAll ],
        resolve     :
        {
            token   : AuthenticatedResolveAll
        }
    },
    {
        path        : 'settings',
        component   : SettingsComponent,
        canActivate : [ AuthenticatedGuardAll ],
        resolve     :
        {
            token   : AuthenticatedResolveAll
        }
    },
    {
        path        : 'login',
        component   : LoginComponent,
        resolve     :
        {
            token   : AuthenticatedResolveAll
        }
    },
    {
        path        : '**',
        component   : LoginComponent,
        resolve     :
        {
            token   : AuthenticatedResolveLogin
        }
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

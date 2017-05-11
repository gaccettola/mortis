
import { NgModule }                  from '@angular/core';
import { RouterModule }              from '@angular/router';

import { LoginComponent }            from '../pages/login/login.component';
import { DashboardComponent }        from '../pages/dashboard/dashboard.component';
import { DesignerComponent }         from '../pages/designer/designer.component.base';
import { EditorComponent }           from '../pages/editor/editor.component.base';
import { MessageHubComponent }       from '../pages/messageHub/messageHub.component.base';
import { SettingsComponent }         from '../pages/settings/settings.component';

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
        path        : 'designer',
        component   : DesignerComponent,
        canActivate : [ AuthenticatedGuardAll ],
        resolve     :
        {
            token   : AuthenticatedResolveAll
        }
    },
    {
        path        : 'editor',
        component   : EditorComponent,
        canActivate : [ AuthenticatedGuardAll ],
        resolve     :
            {
                token   : AuthenticatedResolveAll
            }
    },
    {
        path        : 'messageHub',
        component   : MessageHubComponent,
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

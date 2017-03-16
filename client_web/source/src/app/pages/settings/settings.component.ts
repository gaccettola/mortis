
import { Component, Optional, OnInit }      from '@angular/core';
import { Subscription }                     from 'rxjs/Subscription';

import {MdDialog, MdDialogRef, MdSnackBar}  from '@angular/material';

import { LayoutService  }       from '../../services/layout.service';
import { SocketService }        from '../../services/socket.service';
import { DataframeAccount }     from '../../services/dataframe.account.service';

@Component (
{
    selector    : 'settings'
,   templateUrl : './settings.component.html'
,   styleUrls   : ['./settings.component.css']
} )
export class SettingsComponent implements OnInit
{
    current_height:         string;
    subscription:           Subscription;

    isDarkTheme             : boolean = false;
    lastDialogResult        : string;

    foods: any[]            =
    [
        { name : 'Pizza',         rating : 'Excellent'  }
    ,   { name : 'Burritos',      rating : 'Great'      }
    ,   { name : 'French fries',  rating : 'Pretty good'}
    ];

    progress: number = 0;


    constructor ( private _layoutService    : LayoutService,
                  private _socketService    : SocketService,
                  private _dataframeAccount : DataframeAccount,
                  private _dialog           : MdDialog,
                  private _snackbar         : MdSnackBar )
    {
        setInterval ( () =>
        {
            this.progress = (this.progress + Math.floor(Math.random() * 4) + 1) % 100;

        }, 200 );
    }

    ngOnInit ( ) : void
    {
        this.subscription = this._layoutService.observe_content_height ( ).subscribe (

            value => { this.resizeFn ( ); }

        );

        this._socketService.engine_init ( );
    }

    openDialog()
    {
        let dialogRef = this._dialog.open(DialogContent);

        dialogRef.afterClosed().subscribe(result => {
            this.lastDialogResult = result;
        })
    }

    showSnackbar()
    {
        this._snackbar.open('YUM SNACKS', 'CHEW');
    }

    private resizeFn ( )
    {
        this.current_height = this._layoutService.get_content_height ( );
    }

    login ( ) : void
    {
        let payload =
        {
            userName    : 'gabriel at accettolasystems dot com 888',
            password    : 'gabriel at accettolasystems not com'
        };

        this._dataframeAccount.login ( payload ).then (

            ( value ) =>
            {
                let obj = JSON.parse ( value.data );

                console.log ( 'first try -', obj );

                return value;
            },
            ( error ) =>
            {
                let obj = JSON.parse ( error.data );

                if ( 'account not found' === obj.result )
                {
                    return this._dataframeAccount.write ( payload );
                }

                console.log ( obj );
            }

        );
    }

    signup ( ) : void
    {

    }

}

@Component({
    template: `
    <p>This is a dialog</p>
    <p>
      <label>
        This is a text box inside of a dialog.
        <input #dialogInput>
      </label>
    </p>
    <p> <button md-button (click)="dialogRef.close(dialogInput.value)">CLOSE</button> </p>
  `,
})
export class DialogContent {
    constructor(@Optional() public dialogRef: MdDialogRef<DialogContent>) { }
}

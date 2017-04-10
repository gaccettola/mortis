
import { Component, OnChanges, OnInit, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';

import { SimpleChanges }    from '@angular/core';

import { DesignerService }              from './designer.component.service';

import { IDesignerPoint }               from '../../interface/IDesignerPoint';
import { IDesignerDragProgress }        from '../../interface/IDesignerDragProgress';
import { IDesignerUiInstance }          from '../../interface/IDesignerUiInstance';

import { IDesignerItem }                from '../../interface/IDesignerItem';
import { IDesignerItemConnection }      from '../../interface/IDesignerItemConnection';
import { IDesignerItemSetting }         from '../../interface/IDesignerItemSetting';
import { IDesignerItemTerminal }        from '../../interface/IDesignerItemTerminal';

import * as jQuery                      from 'jquery';
import * as _                           from 'lodash';

@Component (
{
    selector    : 'prop-connector',
    templateUrl : './designer.component.prop.connector.html',
    styleUrls   : ['./designer.component.base.scss']
} )
export class DesignerComponentPropConnector implements OnInit, OnChanges
{
    @Input() designer_config    : IDesignerItemSetting;
    @Input() drag_progress      : IDesignerDragProgress;
    @Input() uiInstance         : IDesignerUiInstance;

    @Output() selectCanvas      = new EventEmitter ( );
    @Output() persist           = new EventEmitter ( );

    constructor (  )
    {
    }

    ngOnChanges ( changes : SimpleChanges )
    {

    }

    ngOnInit ( )
    {

    }

    ngAfterContentInit ( )
    {
        jQuery('.mat-input-wrapper').css( 'width', '100%' );
    }

    on_delete_connector ( event ) : void
    {
        let bfound      = false;
        let bfoundIdx   = -1;

        for ( let i = 0; false === bfound && i < this.uiInstance.listof_item_conn.length ; ++i )
        {
            if ( this.uiInstance.listof_item_conn[i].selected )
            {
                bfound      = true;
                bfoundIdx   = i;
            }
        }

        if ( false === bfound ) return;

        this.uiInstance.listof_item_conn.splice( bfoundIdx, 1 );

        this.selectCanvas.emit ( event );

    }

}

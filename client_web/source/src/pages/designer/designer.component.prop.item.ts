
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
    selector    : 'prop-item',
    templateUrl : './designer.component.prop.item.html',
    styleUrls   : ['./designer.component.base.scss']
} )
export class DesignerComponentPropItem implements OnInit, OnChanges
{
    @Input() designer_config    : IDesignerItemSetting;
    @Input() drag_progress      : IDesignerDragProgress;
    @Input() uiInstance         : IDesignerUiInstance;

    @Output() selectCanvas      = new EventEmitter ( );
    @Output() persist           = new EventEmitter ( );

    constructor ( private _flowService      : DesignerService )
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

    flow_connect_builder ( flow_connect : IDesignerItemConnection ) : IDesignerItemConnection
    {
        _.forEach ( this.uiInstance.listof_item, ( node ) =>
        {
            for ( let i = 0; i < node.input.length ; ++i )
            {
                let conn = node.input[i];

                if ( conn.idx == flow_connect.src_terminal_idx )
                {
                    flow_connect.src_cx = conn.cx;
                    flow_connect.src_cy = conn.cy;

                    flow_connect.src_ct = flow_connect.src_cx + this.designer_config.connection_tangent;
                }

                if ( conn.idx == flow_connect.dst_terminal_idx )
                {
                    flow_connect.dst_cx = conn.cx;
                    flow_connect.dst_cy = conn.cy;

                    flow_connect.dst_ct = flow_connect.dst_cx - this.designer_config.connection_tangent;
                }

            }

            for ( let i = 0; i < node.output.length ; ++i )
            {
                let conn = node.output[i];

                if ( conn.idx == flow_connect.src_terminal_idx )
                {
                    flow_connect.src_cx = conn.cx;
                    flow_connect.src_cy = conn.cy;

                    flow_connect.src_ct = flow_connect.src_cx + this.designer_config.connection_tangent;
                }

                if ( conn.idx == flow_connect.dst_terminal_idx )
                {
                    flow_connect.dst_cx = conn.cx;
                    flow_connect.dst_cy = conn.cy;

                    flow_connect.dst_ct = flow_connect.dst_cx - this.designer_config.connection_tangent;
                }
            }

        } );

        flow_connect.path = `M ${ flow_connect.src_cx }, ${ flow_connect.src_cy }
                             C ${ flow_connect.src_ct }, ${ flow_connect.src_cy }
                               ${ flow_connect.dst_ct }, ${ flow_connect.dst_cy }
                               ${ flow_connect.dst_cx }, ${ flow_connect.dst_cy }`;



        return flow_connect;
    }

    flow_connect_adjuster ( ) : void
    {
        for ( let i = 0; i < this.uiInstance.listof_item_conn.length ; ++i )
        {
            let flow_connect = this.uiInstance.listof_item_conn[i];

            this.uiInstance.listof_item_conn[i] = this.flow_connect_builder ( flow_connect );
        }

    }

    on_delete_terminal_in ( idx ) : void
    {
        console.log ( idx );

        let terminal_idx = this.uiInstance.item_selected.input[idx].idx;

        let bmore = true;

        while ( bmore )
        {
            bmore = this.on_delete_connector_designer_item ( terminal_idx );
        }

        this.uiInstance.item_selected.input.splice ( idx, 1 );
    }

    on_delete_terminal_ut ( idx ) : void
    {
        console.log ( idx );

        let terminal_idx = this.uiInstance.item_selected.output[idx].idx;

        let bmore = true;

        while ( bmore )
        {
            bmore = this.on_delete_connector_designer_item ( terminal_idx );
        }

        this.uiInstance.item_selected.output.splice ( idx, 1 );
    }

    on_width_change ( event ) : void
    {
        if ( this.designer_config.min_width > this.uiInstance.item_selected.width )
        {
            this.uiInstance.item_selected.width = this.designer_config.min_width;
        }

        this.uiInstance.item_selected = this._flowService.designer_item_adjust (

            this.designer_config,
            this.uiInstance.item_selected
        );

        this.flow_connect_adjuster ( );
    }

    on_message_text_change ( event ) : void
    {

    }

    on_delete_connector_designer_item ( idx ) : boolean
    {
        let bfound      = false;
        let bfoundIdx   = -1;

        for ( let i = 0; false === bfound && i < this.uiInstance.listof_item_conn.length ; ++i )
        {
            if ( idx == this.uiInstance.listof_item_conn[i].src_terminal_idx )
            {
                bfound      = true;
                bfoundIdx   = i;
            }

            if ( idx == this.uiInstance.listof_item_conn[i].dst_terminal_idx )
            {
                bfound      = true;
                bfoundIdx   = i;
            }

        }

        if ( false === bfound ) return;

        this.uiInstance.listof_item_conn.splice( bfoundIdx, 1 );

        return bfound;
    }

    on_toggle_primary ( ) : void
    {
        // wait a moment for the new value to kick in
        setTimeout ( () =>
        {
            // it is ok ( invalid but ok ) to make the primary not primary
            // the result then is that we do not know the primary and can not
            // execute the graph reliably
            if ( true !== this.uiInstance.item_selected.is_primary ) return;

            // but we can not have more than one primary, so if we have made
            // one primary that was not primary before then we need to make sure
            // none of the other are marked as primary
            for ( let i = 0; i < this.uiInstance.listof_item.length; ++i )
            {
                if ( this.uiInstance.listof_item[i].idx !== this.uiInstance.item_selected.idx )
                {
                    this.uiInstance.listof_item[i].is_primary = false;
                }

            }

        }, 0 );

    }

}

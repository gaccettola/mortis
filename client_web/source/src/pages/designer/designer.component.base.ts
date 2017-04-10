
import { Component, OnInit, OnDestroy, AfterContentInit, NgZone } from '@angular/core';

import { Observable }                   from 'rxjs/Rx';
import { Subscription }                 from 'rxjs/Subscription';

import { LayoutService  }               from '../../services/layout.service';
import { SocketService }                from '../../services/socket.service';
import { DataframeAccount }             from '../../services/dataframe.account.service';
import { DataframeDesignerTree }        from '../../services/dataframe.designerTree.service';

import { DesignerService }              from './designer.component.service';

import { IDesignerPoint }               from '../../interface/IDesignerPoint';
import { IDesignerDragProgress }        from '../../interface/IDesignerDragProgress';
import { IDesignerUiInstance }          from '../../interface/IDesignerUiInstance';

import { DataframeDesignerTreeItem }            from '../../services/dataframe.designerTreeItem.service';
import { DataframeDesignerTreeItemConnection }  from '../../services/dataframe.designerTreeItemConnection.service';
import { DataframeDesignerTreeItemSetting }     from '../../services/dataframe.designerTreeItemSetting.service';
import { DataframeDesignerTreeItemTerminal }    from '../../services/dataframe.designerTreeItemTerminal.service';

import { IDesignerTree }                from '../../interface/IDesignerTree';

import { IDesignerItem }                from '../../interface/IDesignerItem';
import { IDesignerItemConnection }      from '../../interface/IDesignerItemConnection';
import { IDesignerItemSetting }         from '../../interface/IDesignerItemSetting';
import { IDesignerItemTerminal }        from '../../interface/IDesignerItemTerminal';

import { MouseService }                 from '../../services/mouse.service';

import * as jQuery                      from 'jquery';
import * as _                           from 'lodash';

declare var document : any;

@Component (
{
    selector    : 'designer'
,   templateUrl : './designer.component.base.html'
,   styleUrls   : ['./designer.component.base.scss']
} )
export class DesignerComponent implements OnInit, OnDestroy
{
    current_height          : string;
    height_subscription     : Subscription;

    current_token           : any;
    token_subscription      : Subscription;

    listof_decision_tree    : IDesignerTree [] = [];

    designer_config         : IDesignerItemSetting;
    drag_progress           : IDesignerDragProgress;
    uiInstance              : IDesignerUiInstance;

    constructor ( protected _ngZone              : NgZone
                , private _layoutService         : LayoutService
                , private _socketService         : SocketService
                , private _dataframeAccount      : DataframeAccount
                , private _mouseService          : MouseService
                , private _designerService       : DesignerService
                , private _dataframeDesignerTree : DataframeDesignerTree )
    {
    }

    ngOnInit ( ) : void
    {
        this.height_subscription = this._layoutService.observe_content_height ( ).subscribe (

            value => { this.resizeFn ( ); }

        );

        this.token_subscription = this._dataframeAccount.observe_account_token ( ).subscribe (

            value => { this.current_token = value; }

        );

        this.drag_progress  = this._designerService.get_stock_drag_progress ( );

        this.designer_config    = this._designerService.get_stock_designer_config ( );

        this.uiInstance     = this._designerService.get_stock_ui_instance ( this.designer_config );

        this._socketService.engine_init ( );

        this.uiInstance.svg_online = false;

        this._designerService.fetch_flow_zero ( this.uiInstance, this.listof_decision_tree ).then (

            ( value ) =>
            {
                if ( 0 === value.length )
                {
                    this.on_new_decision_tree ( );

                } else
                {
                    this._designerService.update_next_idx ( this.uiInstance );

                    this.uiInstance.svg_online = true;
                }
            },
            ( error ) =>
            {
                console.log ( '!!! ERROR : _designerService.fetch_flow -', error );

                this.on_new_decision_tree ( );
            }

        );

    }

    ngOnDestroy ( )
    {
        this.height_subscription.unsubscribe();
        this.token_subscription.unsubscribe();
    }

    ngAfterContentInit ( )
    {
        jQuery('.mat-input-wrapper').css( 'width', '100%' );

        this.resizeFn ( );
    }

    private resizeFn ( )
    {
        this.current_height = this._layoutService.get_content_height ( );
    }

    on_background_mousedown ( event ) : void
    {
        event.preventDefault ( );
        event.stopPropagation ( );

        let mouse_type  = this._mouseService.on_mousedown ( event );

        if ( this._designerService.is_canvas ( mouse_type ) )
        {
            console.log ( 'a' );

            this.uiInstance.current_selection = 'canvas';

            return this.on_background_mousedown_canvas ( event )
        }

        if ( this._designerService.is_connector ( mouse_type ) )
        {
            console.log ( 'b' );

            this.uiInstance.current_selection = 'designer-item-terminal';

            return this.on_background_mousedown_connector ( event )
        }

        if ( this._designerService.is_connection ( mouse_type ) )
        {
            console.log ( 'c' );

            this.uiInstance.current_selection = 'designer-item-connector';

            return this.on_background_mousedown_connection ( event )
        }

    }

    on_background_mousedown_canvas ( event ) : void
    {
        event.preventDefault ( );
        event.stopPropagation ( );

        this.drag_progress.in_progress = false;

        this.drag_progress.src_terminal_idx = -1;
        this.drag_progress.dst_terminal_idx = -1;

        for ( let i = 0; i < this.uiInstance.listof_item.length; ++i )
        {
            this.uiInstance.listof_item[i].selected = false;
        }

        this.uiInstance.item_selected_idx = -1;

        for ( let i = 0; i < this.uiInstance.listof_item_conn.length ; ++i )
        {
            this.uiInstance.listof_item_conn[i].selected = false;
        }
    }

    on_background_mousedown_connector ( event ) : void
    {
        let event_idx   = this._mouseService.get_element_idx ( event );

        this.drag_progress.src_terminal_idx = event_idx;

        let svg_pos = jQuery('.designer-host-main').position();

        let pound_idx = `#${event_idx}`;

        let idx_pos = jQuery(pound_idx).position();

        this.drag_progress.point1.cx   = idx_pos.left - svg_pos.left + this.designer_config.conn_radius;
        this.drag_progress.point1.cy   = idx_pos.top  - svg_pos.top  + this.designer_config.conn_radius;

        this.drag_progress.tangent1.cx = this.drag_progress.point1.cx + this.designer_config.connection_tangent;
        this.drag_progress.tangent1.cy = event.clientY - svg_pos.top;

        this.drag_progress.tangent2.cx = event.clientX - svg_pos.left - this.designer_config.connection_tangent;
        this.drag_progress.tangent2.cy = event.clientY - svg_pos.top;

        this.drag_progress.point2.cx   = event.clientX - svg_pos.left;
        this.drag_progress.point2.cy   = event.clientY - svg_pos.top;

        this.drag_progress.svg_path     = `
                M ${this.drag_progress.point1.cx},      ${this.drag_progress.point1.cy}
                C ${this.drag_progress.tangent1.cx},    ${this.drag_progress.tangent1.cy}
                  ${this.drag_progress.tangent2.cx},    ${this.drag_progress.tangent2.cy}
                  ${this.drag_progress.point2.cx},      ${this.drag_progress.point2.cy}
                  `;

        this.drag_progress.in_progress = true;
    }

    on_background_mousedown_connection ( event ) : void
    {
        let event_idx   = this._mouseService.get_element_idx ( event );

        for ( let i = 0; i < this.uiInstance.listof_item_conn.length ; ++i )
        {
            this.uiInstance.listof_item_conn[i].selected = false;
        }

        for ( let i = 0; i < this.uiInstance.listof_item_conn.length ; ++i )
        {
            if ( event_idx == this.uiInstance.listof_item_conn[i].idx )
            {
                this.uiInstance.listof_item_conn[i].selected = true;
            }
        }

    }

    on_background_mousemove ( event ) : void
    {
        if ( true === this.drag_progress.in_progress )
        {
            let svg_pos = jQuery('.designer-host-main').position();

            this.drag_progress.tangent2.cx  = event.clientX - svg_pos.left - this.designer_config.connection_tangent;
            this.drag_progress.tangent2.cy  = event.clientY - svg_pos.top;

            this.drag_progress.point2.cx    = event.clientX - svg_pos.left;
            this.drag_progress.point2.cy    = event.clientY - svg_pos.top;

            this.drag_progress.svg_path     = `
                    M ${this.drag_progress.point1.cx},      ${this.drag_progress.point1.cy}
                    C ${this.drag_progress.tangent1.cx},    ${this.drag_progress.tangent1.cy}
                      ${this.drag_progress.tangent2.cx},    ${this.drag_progress.tangent2.cy}
                      ${this.drag_progress.point2.cx},      ${this.drag_progress.point2.cy}
                      `;
        }

    }

    on_background_mouseup ( event ) : void
    {
        if ( true === this.drag_progress.in_progress )
        {
            let mouse_type      = this._mouseService.on_mouseup ( event );

            if ( this._designerService.is_connector ( mouse_type ) )
            {
                this.uiInstance.current_selection = 'designer-item-terminal';

                let event_idx   = this._mouseService.get_element_idx ( event );

                this.drag_progress.dst_terminal_idx = event_idx;

                let flow_connect  = this._designerService.get_stock_connection ( this.uiInstance, this.drag_progress );

                flow_connect.src_terminal_idx   = this.drag_progress.src_terminal_idx;
                flow_connect.dst_terminal_idx   = this.drag_progress.dst_terminal_idx;

                flow_connect = this.flow_connect_builder ( flow_connect );

                console.log ( flow_connect );

                this.uiInstance.listof_item_conn.push ( flow_connect );

            }

        }

        this.drag_progress.in_progress = false;

        this.drag_progress.src_terminal_idx = -1;
        this.drag_progress.dst_terminal_idx = -1;
    }

    on_click_item_host_toolbar ( event ) : void
    {
        this.on_background_mousedown_canvas ( event );
    }

    on_designer_item_mousedown ( flow, event ) : void
    {
        event.preventDefault ( );
        event.stopPropagation ( );

        this.uiInstance.current_selection = 'designer-item';

        if ( ! event ) return;

        if ( ! event.buttons ) return;

        if ( 1 !== event.buttons ) return;

        for ( let i = 0; i < this.uiInstance.listof_item.length; ++i )
        {
           this.uiInstance.listof_item[i].selected = false;
        }

        flow.selected = true;

        this.uiInstance.item_selected       = flow;

        this.uiInstance.item_selected_idx   = flow.idx;

        this.uiInstance.is_mouse_down   = true;

        this.drag_progress.point1.cx    = event.clientX;
        this.drag_progress.point1.cy    = event.clientY;

        for ( let i = 0; i < this.uiInstance.listof_item_conn.length; ++i )
        {

        }

        jQuery('.mat-input-wrapper').css( 'width', '100%' );

    }

    on_node_mouseup ( event ) : void
    {
        event.preventDefault ( );
        event.stopPropagation ( );

        if ( false === this.uiInstance.is_mouse_down ) return;

        if ( ! event ) return;
    }

    on_node_mousemove ( event ) : void
    {
        if ( false === this.uiInstance.is_mouse_down ) return;

        if ( true === this.drag_progress.in_progress ) return;

        if ( ! event ) return;

        if ( ! event.buttons ) return;

        if ( 1 !== event.buttons ) return;

        let diff_x = event.clientX - this.drag_progress.point1.cx;
        let diff_y = event.clientY - this.drag_progress.point1.cy;

        if ( 0 < ( this.uiInstance.item_selected.cx + diff_x ) )
        {
            this.uiInstance.item_selected.cx += diff_x;
        }

        if ( 0 < ( this.uiInstance.item_selected.cy + diff_y ) )
        {
            this.uiInstance.item_selected.cy += diff_y;
        }

        this.drag_progress.point1.cx = event.clientX;
        this.drag_progress.point1.cy = event.clientY;

        this.uiInstance.item_selected = this._designerService.designer_item_adjust (

            this.designer_config,
            this.uiInstance.item_selected

        );

        this.flow_connect_adjuster ( );
    }

    connector_input_add ( ) : void
    {
        if ( 0 > this.uiInstance.item_selected_idx ) return;

        let node = this._designerService.get_stock_designerTreeItem ( this.uiInstance, this.designer_config, false );

        for ( let i = 0; i < this.uiInstance.listof_item.length; ++i )
        {
            if ( this.uiInstance.listof_item[i].idx === this.uiInstance.item_selected_idx )
            {
                node = this.uiInstance.listof_item[i];
            }
        }

        this._designerService.connector_input_add_to ( this.uiInstance, this.designer_config, node );
    }

    connector_output_add ( ) : void
    {
        if ( 0 > this.uiInstance.item_selected_idx ) return;

        let node = this._designerService.get_stock_designerTreeItem ( this.uiInstance, this.designer_config, false );

        for ( let i = 0; i < this.uiInstance.listof_item.length; ++i )
        {
            if ( this.uiInstance.listof_item[i].idx === this.uiInstance.item_selected_idx )
            {
                node = this.uiInstance.listof_item[i];
            }
        }

        this._designerService.connector_output_add_to ( this.uiInstance, this.designer_config, node );

    }

    on_show_properties ( ) : void
    {
        this.uiInstance.hide_properties = false;
    }

    on_hide_properties ( ) : void
    {
        this.uiInstance.hide_properties = true;
    }

    on_new_decision_tree ( ) : void
    {
        this.drag_progress  = this._designerService.get_stock_drag_progress ( );

        this.designer_config    = this._designerService.get_stock_designer_config ( );

        this.uiInstance     = this._designerService.get_stock_ui_instance ( this.designer_config );

        let decision_tree   = this._designerService.get_stock_designerTree ( );

        decision_tree.designerTreeName = `${ decision_tree.designerTreeName} (${ this.listof_decision_tree.length })`;

        this.listof_decision_tree.push ( decision_tree );

        this.uiInstance.tree_selected = this.listof_decision_tree[ this.listof_decision_tree.length - 1 ];

        this.uiInstance.tree_selected_idx = this.listof_decision_tree.length - 1;

        this.on_add_designer_item ( );
        this.on_add_designer_item ( );

        this.uiInstance.svg_online = true;
    }

    on_add_designer_item ( ) : void
    {
        let node = this._designerService.get_stock_designerTreeItem ( this.uiInstance, this.designer_config, true );

        let bfound = false;
        for ( let i = 0; false === bfound && i < this.uiInstance.listof_item.length; ++i )
        {
            if ( true === this.uiInstance.listof_item[i].is_primary )
            {
                bfound = true;
            }
        }

        if ( bfound )
        {
            // then there is a primary node, add an input

            node = this._designerService.connector_input_add_to ( this.uiInstance, this.designer_config, node );

        } else
        {
            // there is no primary yet, set this as the primary and add an output

            node.is_primary = true;

            node = this._designerService.connector_output_add_to ( this.uiInstance, this.designer_config, node );
        }

        this.uiInstance.listof_item.push ( node );
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

    on_del_designer_item ( event ) : void
    {
        event.preventDefault ( );
        event.stopPropagation ( );

        if ( 0 > this.uiInstance.item_selected_idx ) return;

        let designer_item_idx     = -1;
        let designer_item_term_in = [];
        let designer_item_term_ut = [];

        console.log ( `picklepicklepickle` );

        for ( let i = 0; i < this.uiInstance.listof_item.length; ++i )
        {
            if ( this.uiInstance.listof_item[i].idx == this.uiInstance.item_selected.idx )
            {
                designer_item_idx = i;

                for ( let m = 0; m < this.uiInstance.item_selected.input.length; ++m )
                {
                    designer_item_term_in.push ( this.uiInstance.item_selected.input[m].idx );
                }

                for ( let n = 0; n < this.uiInstance.item_selected.output.length; ++n )
                {
                    designer_item_term_ut.push ( this.uiInstance.item_selected.output[n].idx );
                }

                this.uiInstance.listof_item.splice( i, 1 );
            }
        }

        for ( let m = 0; m < designer_item_term_in.length; ++m )
        {
            let bmore = true;

            while ( bmore )
            {
                bmore = this.on_delete_connector_designer_item ( designer_item_term_in[m] );
            }
        }

        for ( let m = 0; m < designer_item_term_ut.length; ++m )
        {
            let bmore = true;

            while ( bmore )
            {
                bmore = this.on_delete_connector_designer_item ( designer_item_term_ut[m] );
            }
        }

        for ( let i = 0; i < this.uiInstance.listof_item.length; ++i )
        {
            this.uiInstance.listof_item[i].idx = i;
        }

        this.uiInstance.item_selected_idx = -1;

        for ( let i = 0; i < this.uiInstance.listof_item.length; ++i )
        {
            this.uiInstance.listof_item[i].selected = false;
        }

    }

    flow_connect_adjuster ( ) : void
    {
        for ( let i = 0; i < this.uiInstance.listof_item_conn.length ; ++i )
        {
            let flow_connect = this.uiInstance.listof_item_conn[i];

            this.uiInstance.listof_item_conn[i] = this.flow_connect_builder ( flow_connect );
        }

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

    on_delete_terminal_ut ( idx ) : void
    {
        console.log ( idx );

        this.uiInstance.item_selected.output.splice ( idx, 1 );
    }

    on_width_change ( event ) : void
    {
        if ( this.designer_config.min_width > this.uiInstance.item_selected.width )
        {
            this.uiInstance.item_selected.width = this.designer_config.min_width;
        }

        this.uiInstance.item_selected = this._designerService.designer_item_adjust (

            this.designer_config,
            this.uiInstance.item_selected
        );

        this.flow_connect_adjuster ( );
    }

    on_message_text_change ( event ) : void
    {
    }

    on_change_selected_tree ( event ) : void
    {
        let bfound = false;

        this.uiInstance.svg_online = false;

        for ( let i = 0; false === bfound && i < this.listof_decision_tree.length; ++i )
        {
            if ( this.listof_decision_tree[i].designerTreeId === event.value.designerTreeId )
            {
                bfound = true;

                this.uiInstance.tree_selected_idx = i;
            }
        }

        this._designerService.fetch_item_selected ( this.uiInstance, this.listof_decision_tree ).then (

            ( value ) =>
            {
                this._designerService.update_next_idx ( this.uiInstance );

                this.uiInstance.svg_online = true;
            },
            ( error ) =>
            {
                console.log ( '!!! ERROR : _designerService.fetch_flow -', error );

                this.uiInstance.svg_online = true;
            }

        );

    }

    on_event_select_canvas ( event ) : void
    {
        this.uiInstance.current_selection = 'canvas';

        this.on_background_mousedown_canvas ( event );
    }

    on_event_persist ( event ) : Promise<any>
    {
        this.uiInstance.svg_online = false;

        return new Promise ( ( resolve, reject ) => this._ngZone.run ( ( ) =>
        {
            this._designerService.persist_flow ( this.uiInstance ).then (

                ( value ) =>
                {
                    this.uiInstance = value;

                    this.listof_decision_tree[ this.uiInstance.tree_selected_idx ] = this.uiInstance.tree_selected;

                    this.uiInstance.svg_online = true;
                },
                ( error ) =>
                {
                    throw ( error );
                }

            ).catch (

                ( ex ) =>
                {
                    console.log ( `!!! ERROR during persist_flow : ${ ex }` );

                    this.uiInstance.svg_online = true;
                }

            );

        } ) );
    }

}

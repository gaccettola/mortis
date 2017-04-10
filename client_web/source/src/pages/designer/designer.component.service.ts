
import { Injectable, NgZone }       from '@angular/core';

import { IDesignerTree }            from '../../interface/IDesignerTree';
import { IDesignerDragProgress }    from '../../interface/IDesignerDragProgress';
import { IDesignerItem }            from '../../interface/IDesignerItem';
import { IDesignerItemConnection }  from '../../interface/IDesignerItemConnection';
import { IDesignerItemSetting }     from '../../interface/IDesignerItemSetting';
import { IDesignerItemTerminal }    from '../../interface/IDesignerItemTerminal';
import { IDesignerPoint }           from '../../interface/IDesignerPoint';
import { IDesignerUiInstance }      from '../../interface/IDesignerUiInstance';

import { DataframeDesignerTree }                from '../../services/dataframe.designerTree.service';
import { DataframeDesignerTreeItem }            from '../../services/dataframe.designerTreeItem.service';
import { DataframeDesignerTreeItemConnection }  from '../../services/dataframe.designerTreeItemConnection.service';
import { DataframeDesignerTreeItemSetting }     from '../../services/dataframe.designerTreeItemSetting.service';
import { DataframeDesignerTreeItemTerminal }    from '../../services/dataframe.designerTreeItemTerminal.service';

import * as _                       from 'lodash';

declare var document : any;

@Injectable()
export class DesignerService
{
    TYPE_INPUT  : number = 0;
    TYPE_OUTPUT : number = 1;

    constructor ( protected _ngZone                   : NgZone,
                  private _designerTree               : DataframeDesignerTree,
                  private _designerTreeItem           : DataframeDesignerTreeItem,
                  private _designerTreeItemTerminal   : DataframeDesignerTreeItemTerminal,
                  private _designerTreeItemConnection : DataframeDesignerTreeItemConnection )
    {

    }

    is_canvas ( mouse_type ) : boolean
    {
        if ( mouse_type === 'canvas' ) return true;

        if ( mouse_type === 'unmapped' ) return true;

        if ( mouse_type === 'null' ) return true;

        return false;
    }

    is_connector ( mouse_type ) : boolean
    {
        if ( mouse_type === 'designer-item-connector' ) return true;

        if ( mouse_type === 'designer-item-connector-selected' ) return true;

        return false;
    }

    is_connection ( mouse_type ) : boolean
    {
        if ( mouse_type === 'designer-item-connection' ) return true;

        if ( mouse_type === 'designer-item-connection-selected' ) return true;

        return false;
    }

    get_stock_designer_config ( ) : IDesignerItemSetting
    {
        let retval =
        {
            conn_y_sep          : 21,
            conn_radius         : 7,
            connection_tangent  : 75,
            next_item_offset_cx : 20,
            next_item_offset_cy : 20,

            fill                : 'purple',
            radius              : 1,
            min_height          : 40,
            min_width           : 160,
            height              : 40,
            width               : 160,
            label_in            : 'in',
            label_out           : 'out'
        };

        return retval;
    }

    get_stock_drag_progress ( ) : IDesignerDragProgress
    {
        let retval =
        {
            in_progress         : false,
            point1              : { cx : -1, cy : -1 },
            tangent1            : { cx : -1, cy : -1 },
            point2              : { cx : -1, cy : -1 },
            tangent2            : { cx : -1, cy : -1 },
            svg_path            : '',
            src_terminal_idx    : -1,
            dst_terminal_idx    : -1,
        };

        return retval;
    }

    get_stock_designerTree ( ) : IDesignerTree
    {
        let retval =
        {
            designerTreeId          : -1,
            businessId              : -1,
            designerTreeName        : 'default',
            designerTreeDesc        : '',
            createdOn               : '',
            updatedOn               : ''
        };

        return retval;
    }

    get_stock_ui_instance ( designer_config ) : IDesignerUiInstance
    {
        let retval =
        {
            svg_online          : false,

            current_selection   : 'canvas',

            tree_selected       : this.get_stock_designerTree ( ),
            tree_selected_idx   : 0,

            listof_item         : [],      // list of flow items, the nodes
            listof_item_conn    : [],      // list of flow item connections

            item_selected       : null,    // the selected flow item if any else empty object
            item_selected_idx   : -1,      // the index of the selected flow item else -1

            is_mouse_down       : false,
            hide_properties     : false,

            next_idx            : 0,
            next_point          :
            {
                cx : designer_config.next_item_offset_cx,
                cy : designer_config.next_item_offset_cy
            }
        };

        return retval;

    }

    get_stock_connection ( uiInstance    : IDesignerUiInstance,
                           drag_progress : IDesignerDragProgress ) : IDesignerItemConnection
    {
        ++uiInstance.next_idx;

        let retval  =
        {
            designerTreeItemConnectionId   : -1,
            designerTreeId          : -1,
            businessId              : -1,

            idx                     : uiInstance.next_idx,
            src_terminal_idx        : drag_progress.src_terminal_idx,
            dst_terminal_idx        : drag_progress.dst_terminal_idx,
            selected                : false,
            src_cx                  : -1,
            src_cy                  : -1,
            src_ct                  : -1,
            dst_cx                  : -1,
            dst_cy                  : -1,
            dst_ct                  : -1,
            path                    : ''
        };

        return retval;
    }

    get_stock_designerTreeItem ( uiInstance    : IDesignerUiInstance,
                         designer_config   : IDesignerItemSetting,
                         bAndIncrement : boolean ) : IDesignerItem
    {
        ++uiInstance.next_idx;

        let retval =
        {
            designerTreeItemId      : -1,
            designerTreeId  : uiInstance.tree_selected.designerTreeId,
            businessId      : uiInstance.tree_selected.businessId,

            idx             : uiInstance.next_idx,
            fill            : designer_config.fill,
            radius          : designer_config.radius,
            cx              : uiInstance.next_point.cx,
            cy              : uiInstance.next_point.cy,
            selected        : false,
            min_height      : designer_config.min_height,
            height          : designer_config.min_height,
            width           : designer_config.min_width,

            input           : [],
            output          : [],

            message_text    : '',
            is_primary      : false,
        };

        if ( true === bAndIncrement )
        {
            uiInstance.next_point.cx += designer_config.next_item_offset_cx;
            uiInstance.next_point.cy += designer_config.next_item_offset_cy;
        }

        return retval;
    }

    connector_input_add_to ( uiInstance  : IDesignerUiInstance,
                             designer_config : IDesignerItemSetting,
                             node        : IDesignerItem ) : IDesignerItem
    {
        let conn_y_offset = ( node.input.length + 1 ) * designer_config.conn_y_sep;

        let conn_x      = node.cx;
        let conn_y      = node.cy + conn_y_offset;

        ++uiInstance.next_idx;

        node.input.push (
        {
            designerTreeItemTerminalId  : -1,
            businessId          : uiInstance.tree_selected.businessId,
            designerTreeItemId          : node.designerTreeItemId,
            terminalType        : this.TYPE_INPUT,

            idx                 : uiInstance.next_idx,
            label               : designer_config.label_in,
            radius              : designer_config.conn_radius,
            cx                  : conn_x,
            cy                  : conn_y,

        } );

        if ( node.min_height < ( conn_y_offset + designer_config.conn_y_sep ) )
        {
            node.min_height = ( conn_y_offset + designer_config.conn_y_sep );
        }

        if ( node.height < node.min_height )
        {
            node.height = node.min_height;
        }

        return node;
    }

    connector_output_add_to ( uiInstance  : IDesignerUiInstance,
                              designer_config : IDesignerItemSetting,
                              node        : IDesignerItem ) : IDesignerItem
    {
        let conn_y_offset   = ( node.output.length + 1 ) * designer_config.conn_y_sep;

        let conn_x          = node.cx + node.width;
        let conn_y          = node.cy + conn_y_offset;

        ++uiInstance.next_idx;

        node.output.push (
        {
            designerTreeItemTerminalId  : -1,
            businessId          : uiInstance.tree_selected.businessId,
            designerTreeItemId          : node.designerTreeItemId,
            terminalType        : this.TYPE_OUTPUT,

            idx                 : uiInstance.next_idx,
            label               : designer_config.label_out,
            radius              : designer_config.conn_radius,
            cx                  : conn_x,
            cy                  : conn_y,

        } );

        if ( node.min_height < ( conn_y_offset + designer_config.conn_y_sep ) )
        {
            node.min_height = ( conn_y_offset + designer_config.conn_y_sep ) ;
        }

        if ( node.height < node.min_height )
        {
            node.height = node.min_height;
        }

        return node;
    }

    designer_item_adjust ( designer_config : IDesignerItemSetting,
                       node        : IDesignerItem ) : IDesignerItem
    {
        node = this.designer_item_adjust_input  ( designer_config, node );
        node = this.designer_item_adjust_output ( designer_config, node );

        return node;
    }

    designer_item_adjust_input ( designer_config, node : IDesignerItem ) : IDesignerItem
    {
        let conn_y_offset   = 0;

        for ( let i = 0; i < node.input.length ; ++i )
        {
            let conn        = node.input[i];

            conn_y_offset   = ( i + 1 ) * designer_config.conn_y_sep;
            let conn_x      = node.cx;
            let conn_y      = node.cy + conn_y_offset;

            conn.radius = designer_config.conn_radius;
            conn.cx = conn_x;
            conn.cy = conn_y;
        }

        if ( node.min_height < ( conn_y_offset + designer_config.conn_y_sep ) )
        {
            node.min_height = ( conn_y_offset + designer_config.conn_y_sep ) ;
        }

        if ( node.height < node.min_height )
        {
            node.height = node.min_height;
        }

        return node;
    }

    designer_item_adjust_output ( designer_config, node : IDesignerItem ) : IDesignerItem
    {
        let conn_y_offset   = 0;

        for ( let i = 0; i < node.output.length ; ++i )
        {
            let conn        = node.output[i];
            conn_y_offset   = ( i + 1 ) * designer_config.conn_y_sep;
            let conn_x      = node.cx + node.width;
            let conn_y      = node.cy + conn_y_offset;

            conn.radius = designer_config.conn_radius;
            conn.cx = conn_x;
            conn.cy = conn_y;
        }

        if ( node.min_height < ( conn_y_offset + designer_config.conn_y_sep ) )
        {
            node.min_height = ( conn_y_offset + designer_config.conn_y_sep ) ;
        }

        if ( node.height < node.min_height )
        {
            node.height = node.min_height;
        }

        return node;
    }

    update_next_idx ( uiInstance : IDesignerUiInstance ) : number
    {
        let retval = 0;

        for ( let i = 0; i < uiInstance.listof_item.length; ++i )
        {
            if ( uiInstance.listof_item[i].idx > retval )
            {
                retval = uiInstance.listof_item[i].idx + 1;
            }

            for ( let j = 0; j < uiInstance.listof_item[i].input.length; ++j )
            {
                if ( uiInstance.listof_item[i].input[j].idx > retval )
                {
                    retval = uiInstance.listof_item[i].input[j].idx + 1;
                }

            }

            for ( let j = 0; j < uiInstance.listof_item[i].output.length; ++j )
            {
                if ( uiInstance.listof_item[i].output[j].idx > retval )
                {
                    retval = uiInstance.listof_item[i].output[j].idx + 1;
                }
            }

        }

        for ( let i = 0; i < uiInstance.listof_item_conn.length; ++i )
        {
            if ( uiInstance.listof_item_conn[i].idx > retval )
            {
                retval = uiInstance.listof_item_conn[i].idx + 1;
            }
        }

        uiInstance.next_idx = retval;

        return retval;

    }

    persist_flow ( uiInstance : IDesignerUiInstance ) : Promise<any>
    {
        return new Promise ( ( resolve, reject ) => this._ngZone.run ( ( ) =>
        {
            // persist the tree

            this._designerTree.persist_tree ( uiInstance ).then (

                ( value ) =>
                {
                    // then persist the set of item

                    return this._designerTreeItem.persist_setof_item ( uiInstance );
                },
                ( error ) =>
                {
                    throw ( error );
                }

            ).then (

                ( value ) =>
                {
                    // then persist the set of terminal input

                    return this._designerTreeItemTerminal.persist_setof_terminal ( uiInstance );

                },
                ( error ) =>
                {
                    throw ( error );
                }

            ).then (

                ( value ) =>
                {
                    // then persist the set of connection

                    return this._designerTreeItemConnection.persist_setof_connection ( uiInstance );
                },
                ( error ) =>
                {
                    throw ( error );
                }

            ).then (

                ( value ) =>
                {
                    // then resolve

                    resolve ( uiInstance );

                },
                ( error ) =>
                {
                    throw ( error );
                }

            ).catch (

                ( ex ) =>
                {
                    reject ( uiInstance );
                }

            );

        } ) );
    }

    fetch_flow_zero ( uiInstance : IDesignerUiInstance, listof_decision_tree : IDesignerTree [] ) : Promise<any>
    {
        return new Promise ( ( resolve, reject ) => this._ngZone.run ( ( ) =>
        {
            // fetch the tree

            this._designerTree.fetch_tree ( uiInstance, listof_decision_tree ).then (

                ( value ) =>
                {
                    return this._designerTreeItem.fetch_setof_item ( uiInstance, listof_decision_tree );
                },
                ( error ) =>
                {
                    throw ( error );
                }

            ).then (

                ( value ) =>
                {
                    // then fetch the set of terminal input

                    return this._designerTreeItemTerminal.fetch_setof_terminal ( uiInstance, listof_decision_tree );
                },
                ( error ) =>
                {
                    throw ( error );
                }

            ).then (

                ( value ) =>
                {
                    // then fetch the set of connection

                    return this._designerTreeItemConnection.fetch_setof_connection ( uiInstance, listof_decision_tree );
                },
                ( error ) =>
                {
                    throw ( error );
                }

            ).then (

                ( value ) =>
                {
                    // then resolve

                    resolve ( listof_decision_tree );
                },
                ( error ) =>
                {
                    throw ( error );
                }

            ).catch (

                ( ex ) =>
                {
                    reject ( ex );
                }

            );

        } ) );

    }

    fetch_item_selected ( uiInstance : IDesignerUiInstance, listof_decision_tree : IDesignerTree [] ) : Promise<any>
    {
        return new Promise ( ( resolve, reject ) => this._ngZone.run ( ( ) =>
        {
            // fetch the tree

            this._designerTreeItem.fetch_setof_item ( uiInstance, listof_decision_tree ).then (

                ( value ) =>
                {
                    // then fetch the set of terminal input

                    return this._designerTreeItemTerminal.fetch_setof_terminal ( uiInstance, listof_decision_tree );
                },
                ( error ) =>
                {
                    throw ( error );
                }

            ).then (

                ( value ) =>
                {
                    // then fetch the set of connection

                    return this._designerTreeItemConnection.fetch_setof_connection ( uiInstance, listof_decision_tree );
                },
                ( error ) =>
                {
                    throw ( error );
                }

            ).then (

                ( value ) =>
                {
                    // then resolve

                    resolve ( listof_decision_tree );
                },
                ( error ) =>
                {
                    throw ( error );
                }

            ).catch (

                ( ex ) =>
                {
                    reject ( ex );
                }

            );

        } ) );

    }

}

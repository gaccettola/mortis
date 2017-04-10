
import { Injectable, NgZone }       from '@angular/core';

import { IDesignerTree }            from './IDesignerTree';
import { IDesignerItem }            from './IDesignerItem';
import { IDesignerItemConnection }  from './IDesignerItemConnection';
import { IDesignerPoint }           from './IDesignerPoint';

/**
 * instance variables, not persisted to the db
 * uiInstance.
 */
export interface IDesignerUiInstance
{
    svg_online          : boolean,

    current_selection   : string,

    tree_selected       : IDesignerTree,
    tree_selected_idx   : number,

    listof_item         : IDesignerItem [],
    listof_item_conn    : IDesignerItemConnection [],

    item_selected       : IDesignerItem,
    item_selected_idx   : number,

    is_mouse_down       : boolean,
    hide_properties     : boolean,      // indicates whether the properties are shown

    next_idx            : number,
    next_point          : IDesignerPoint,

}

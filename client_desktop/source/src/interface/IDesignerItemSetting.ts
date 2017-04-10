
import { Injectable, NgZone }   from '@angular/core';

/**
 * the template of the settings used
 */
export interface IDesignerItemSetting
{
    conn_y_sep              : number;   // the distance between connectors
    conn_radius             : number;   // the radius of connectors
    connection_tangent      : number;   // default distance from a point to the tangent

    next_item_offset_cx     : number;   // the distance for the next item created - horizontal offset
    next_item_offset_cy     : number;   // the distance for the next item created - vertical offset

    fill                    : string;   // the default color used to fill a flow item
    radius                  : number;   // the default radius of the flow item

    min_height              : number;   // flow item min height
    min_width               : number;   // flow item min width

    height                  : number;   // new flow item default height
    width                   : number;   // new flow item default width

    label_in                : string;   // new flow item default label for an input
    label_out               : string;   // new flow item default label for an output
}


import { Injectable, NgZone }   from '@angular/core';

/**
 * the template for a concrete implementation
 * of a connection between one flow item and another
 * persisted to the db
 */
export interface IDesignerItemConnection
{
    designerTreeItemConnectionId    : number;
    designerTreeId                  : number;
    businessId                      : number;

    idx                             : number;
    src_terminal_idx                : number;
    dst_terminal_idx                : number;
    selected                        : boolean;
    src_cx                          : number;
    src_cy                          : number;
    src_ct                          : number;
    dst_cx                          : number;
    dst_cy                          : number;
    dst_ct                          : number;
    path                            : string;
}

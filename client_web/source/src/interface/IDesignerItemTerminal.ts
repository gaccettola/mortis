
import { Injectable, NgZone }   from '@angular/core';

/**
 * the template for a concrete implementation
 * of a connection point on a flow item
 * persisted to the db
 */
export interface IDesignerItemTerminal
{
    designerTreeItemTerminalId  : number;
    businessId                  : number;
    designerTreeItemId          : number;

    // 0 Input 1 Ouput
    terminalType                : number;

    idx                         : number;
    label                       : string;
    radius                      : number;
    cx                          : number;
    cy                          : number;
}

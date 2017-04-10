
import { Injectable, NgZone }       from '@angular/core';

import { IDesignerItemTerminal }    from './IDesignerItemTerminal';

/**
 * the template for a concrete implementation
 * of a flow item
 * persisted to the db
 */
export interface IDesignerItem
{
    designerTreeItemId      : number,
    designerTreeId          : number,
    businessId              : number,

    idx                     : number;
    fill                    : string;
    radius                  : number;
    cx                      : number;
    cy                      : number;
    selected                : boolean;
    min_height              : number;
    height                  : number;
    width                   : number;

    is_primary              : boolean;
    message_text            : string;

    input                   : IDesignerItemTerminal [];
    output                  : IDesignerItemTerminal [];
}

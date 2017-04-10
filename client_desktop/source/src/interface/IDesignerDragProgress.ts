
import { Injectable, NgZone }   from '@angular/core';

import { IDesignerPoint }           from './IDesignerPoint';

/**
 * instance variables, not persisted to the db
 */
export interface IDesignerDragProgress
{
    in_progress             : boolean           // indicates whether a connection drag is in progress
    point1                  : IDesignerPoint,   // source point
    tangent1                : IDesignerPoint,   // source tangent
    point2                  : IDesignerPoint,   // destination point
    tangent2                : IDesignerPoint,   // destination tangent
    svg_path                : string,           // svg path
    src_terminal_idx        : number,           // idx of the source terminal
    dst_terminal_idx        : number            // idx of the destination terminal
}

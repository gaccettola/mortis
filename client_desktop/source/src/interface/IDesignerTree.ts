
import { Injectable, NgZone }   from '@angular/core';

import { IDesignerPoint }       from './IDesignerPoint';

export interface IDesignerTree
{
    designerTreeId          : number,
    businessId              : number,
    designerTreeName        : string,
    designerTreeDesc        : string,
    createdOn               : string,
    updatedOn               : string
}

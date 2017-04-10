
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
    selector    : 'prop-terminal',
    templateUrl : './designer.component.prop.terminal.html',
    styleUrls   : ['./designer.component.base.scss']
} )
export class DesignerComponentPropTerminal implements OnInit, OnChanges
{
    @Input() designer_config    : IDesignerItemSetting;
    @Input() drag_progress      : IDesignerDragProgress;
    @Input() uiInstance         : IDesignerUiInstance;

    @Output() selectCanvas      = new EventEmitter ( );
    @Output() persist           = new EventEmitter ( );

    constructor (  )
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

}

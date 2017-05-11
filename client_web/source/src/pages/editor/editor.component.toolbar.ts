
import { Component, OnChanges, OnInit, Input, Output, EventEmitter, OnDestroy, AfterContentInit } from '@angular/core';

import { SimpleChanges }    from '@angular/core';

import { ActivatedRoute }               from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';

import { LayoutService  }               from '../../services/layout.service';
import { SocketService }                from '../../services/socket.service';
import { DataframeAccount }             from '../../services/dataframe.account.service';

import * as jQuery                      from 'jquery';
import * as _                           from 'lodash';

@Component (
{
    selector    : 'editor-toolbar'
,   templateUrl : './editor.component.toolbar.html'
,   styleUrls   : ['./editor.component.scss', './markdown.scss']
} )
export class EditorComponentToolbar implements OnInit, OnChanges
{
    @Input() editor_config  : any =
    {
        view_mode   : 2,
        view_size   : 50
    };

    @Input() doc            : any =
    {
        title   : ''
    };

    @Input() show_toc       : boolean = true;

    @Input() code_size      : number = 50;
    @Input() html_size      : number = 50;

    @Output() toggle_toc    = new EventEmitter ( );
    @Output() update_div    = new EventEmitter ( );

    constructor (  )
    {
    }

    ngOnChanges ( changes : SimpleChanges )
    {

    }

    ngOnInit ( ) : void
    {

    }

    ngAfterContentInit ( )
    {
        jQuery('.mat-input-wrapper').css( 'width', '100%' );
    }

    on_change_editor_title ( event )
    {

    }

    on_toggle_toc ( ) : void
    {
        this.show_toc = ! this.show_toc;

        this.toggle_toc.emit ( this.show_toc );
    }

    on_change_view_size ( event ) : void
    {
        this.code_size = this.editor_config.view_size;

        this.html_size = 100 - this.code_size;

        let e = { code_size : this.code_size, html_size : this.html_size };

        this.update_div.emit ( e );
    }

}

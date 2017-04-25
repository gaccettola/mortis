
import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { ActivatedRoute }               from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';

import { LayoutService  }               from '../../services/layout.service';
import { SocketService }                from '../../services/socket.service';
import { DataframeAccount }             from '../../services/dataframe.account.service';

import * as jQuery                      from 'jquery';
import * as _                           from 'lodash';

import * as showdown                    from 'showdown'
import 'showdown-highlightjs-extension'

@Component (
{
    selector    : 'editor'
,   templateUrl : './editor.component.html'
,   styleUrls   : ['./editor.component.scss', './markdown.scss']
} )
export class EditorComponent implements OnInit
{
    current_height      : string;
    height_subscription : Subscription;

    current_token       : any;
    token_subscription  : Subscription;

    view_mode_label     : string;

    editor_config : any =
    {
        view_mode   : 2,
        view_size   : 50
    };

    doc : any =
    {
        title : ''
    };

    codemirror_code   = ``;
    codemirror_config =
    {
        // theme        : 'neo',
        // theme        : 'neat',
        // theme        : 'elegant',
        theme           : 'eclipse',

        // mode         : 'javascript',
        mode            : 'markdown',

        lineNumbers     : true,
        lineWrapping    : true,
    };

    inner_html_md : string = '';

    converter = new showdown.Converter (
    {
        extensions                              : [ 'highlightjs' ],
        omitExtraWLInCodeBlocks                 : false,
        noHeaderId                              : true,
        prefixHeaderId                          : true,
        parseImgDimensions                      : true,
        headerLevelStart                        : 1,
        literalMidWordUnderscores               : true,
        strikethrough                           : true,
        tables                                  : true,
        tablesHeaderId                          : true,
        ghCodeBlocks                            : true,
        tasklists                               : true,
        smoothLivePreview                       : true,
    } );

    code_size :number = 50;
    html_size :number = 50;

    constructor ( private _route            : ActivatedRoute
                , private _layoutService    : LayoutService
                , private _socketService    : SocketService
                , private _dataframeAccount : DataframeAccount
                 )
    {
    }

    ngOnInit ( ) : void
    {
        this.height_subscription = this._layoutService.observe_content_height ( ).subscribe (

            value => { this.resizeFn ( ); }

        );

        this.token_subscription = this._dataframeAccount.observe_account_token ( ).subscribe (

            value => { this.current_token = value; }

        );

        this._socketService.engine_init ( );
    }

    ngAfterContentInit ( )
    {
        this.resizeFn ( );
    }

    ngAfterViewInit ( )
    {
        this.resizeFn ( );
    }

    ngOnDestroy ( )
    {
        this.height_subscription.unsubscribe();
        this.token_subscription.unsubscribe();
    }

    private resizeFn ( )
    {
        this.current_height = this._layoutService.get_content_height ( );

        jQuery('.CodeMirror').css( 'height',     '100%' );
        jQuery('.CodeMirror').css( 'min-height', '100%' );

        let font = `Roboto, "Helvetica Neue", sans-serif`;
        jQuery('.CodeMirror').css( 'font-family', font );
    }

    on_change_editor_title ( event )
    {

    }

    onCodeMirrorEditorFocused ( )
    {
    }

    onCodeMirrorEditorChanged ( value )
    {
        this.inner_html_md = this.converter.makeHtml(value);
    }

    onCodeMirrorEditorBlur ( )
    {
    }

    on_change_view_size ( event ) : void
    {
        this.code_size = this.editor_config.view_size;

        this.html_size = 100 - this.code_size;

        this.resizeFn ( );
    }

}

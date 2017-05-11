
import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { ActivatedRoute }               from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';

import { LayoutService  }               from '../../services/layout.service';
import { SocketService }                from '../../services/socket.service';
import { DataframeAccount }             from '../../services/dataframe.account.service';

import * as jQuery                      from 'jquery';
import * as _                           from 'lodash';

import { DragulaService }               from 'ng2-dragula';

import * as showdown                    from 'showdown'
import 'showdown-highlightjs-extension'

@Component (
{
    selector    : 'editor'
,   templateUrl : './editor.component.base.html'
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

    code_size       : number = 50;
    html_size       : number = 50;

    show_toc        : boolean = true;

    selected_text   : any        = { title : '',  plaintext : '', is_selected : false };
    selected_idx    : number     = -1;
    listof_text     : Array<any> =
    [
        { title : 'section 1',  plaintext : '## 001', is_selected : false, is_edit : false },
        { title : 'section 2',  plaintext : '## 002', is_selected : false, is_edit : false },
        { title : 'section 3',  plaintext : '## 003', is_selected : false, is_edit : false },
        { title : 'section 4',  plaintext : '## 004', is_selected : false, is_edit : false },
        { title : 'section 5',  plaintext : '## 005', is_selected : false, is_edit : false },
        { title : 'section 6',  plaintext : '## 006', is_selected : false, is_edit : false },
        { title : 'section 7',  plaintext : '## 007', is_selected : false, is_edit : false },
        { title : 'section 8',  plaintext : '## 008', is_selected : false, is_edit : false },
        { title : 'section 9',  plaintext : '## 009', is_selected : false, is_edit : false },
        { title : 'section 10', plaintext : '## 010', is_selected : false, is_edit : false },
        { title : 'section 11', plaintext : '## 011', is_selected : false, is_edit : false },
        { title : 'section 12', plaintext : '## 012', is_selected : false, is_edit : false }
    ];

    constructor ( private _route            : ActivatedRoute
                , private _layoutService    : LayoutService
                , private _socketService    : SocketService
                , private _dataframeAccount : DataframeAccount
                , private _dragulaService   : DragulaService )
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

        this._dragulaService.drag.subscribe( ( value : any ) =>
        {
            // console.log(`drag: ${value[0]}`); // value[0] will always be bag name
            this.on_dragula_drag ( value.slice(1) );

        } );

        this._dragulaService.drop.subscribe( ( value : any ) =>
        {
            // console.log(`drop: ${value[0]}`);

            this.on_dragula_drop ( value.slice(1) );

            // this.on_dragula_drop ( value );

        } );

        this._dragulaService.over.subscribe( ( value : any ) =>
        {
            // console.log(`over: ${value[0]}`);
            this.on_dragula_over ( value.slice(1) );

        } );

        this._dragulaService.out.subscribe( ( value : any ) =>
        {
            // console.log(`out: ${value[0]}`);
            this.on_dragula_out ( value.slice(1) );

        } );

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

    can_toc_prev ( ) : boolean
    {
        let retval = false;

        if ( ! ( this.selected_idx > 0 ) ) return retval;

        retval = true;

        return retval;
    }

    can_toc_next ( ) : boolean
    {
        let retval = false;

        if ( ! ( this.selected_idx < this.listof_text.length -1 ) ) return retval;

        retval = true;

        return retval;
    }

    on_toc_prev ( ) : void
    {
        if ( ! this.can_toc_prev ( ) ) return;

        this.selected_idx--;

        this.selected_text = this.listof_text[this.selected_idx];

        _.forEach ( this.listof_text, ( item ) =>
        {
            item.is_selected = false;

        } );

        this.listof_text[this.selected_idx].is_selected = true;

        this.selected_text.is_selected = true;

        this.onCodeMirrorEditorChanged ( this.selected_text.plaintext );
    }

    on_toc_next ( ) : void
    {
        if ( ! this.can_toc_next ( ) ) return;

        this.selected_idx++;

        this.selected_text = this.listof_text[this.selected_idx];

        _.forEach ( this.listof_text, ( item ) =>
        {
            item.is_selected = false;

        } );

        this.listof_text[this.selected_idx].is_selected = true;

        this.selected_text.is_selected = true;

        this.onCodeMirrorEditorChanged ( this.selected_text.plaintext );
    }

    on_select_text_md ( event, item_text, idx ) : void
    {
        let already_selected = this.listof_text[idx].is_selected;

        _.forEach ( this.listof_text, ( item ) =>
        {
            item.is_selected = false;
            item.is_edit     = false;
        } );

        item_text.is_selected = true;

        if ( already_selected )
        {
            this.listof_text[idx].is_edit = true;
        }

        this.selected_text = item_text;

        this.selected_idx = idx;

        this.onCodeMirrorEditorChanged ( this.selected_text.plaintext );

    }

    on_dragula_drag ( value ) : void
    {
    }

    on_dragula_drop ( value ) : void
    {
        let [el, parent] = value;

        let index = this.getElementIndex(el);

        if ( 0 > index ) return;

        this.selected_idx = index;

        let item = this.listof_text[index];

        console.log ( `the thing : ${item.title} at ${index}` );

    }

    on_dragula_over ( value ) : void
    {
    }

    on_dragula_out ( value ) : void
    {
        // _.forEach ( this.listof_text, ( item, idx ) =>
        // {
        //     console.log ( `on_dragula_list : ${item.title} ${idx}` );
        //
        // } );
    }

    private getElementIndex ( el: any ) : number
    {
        let retval = -1;

        if ( ! el ) return retval;

        if ( ! el.parentElement ) return retval;

        if ( ! el.parentElement.children ) return retval;

        if ( ! [].slice.call(el.parentElement.children).indexOf ) return retval;

        retval = [].slice.call(el.parentElement.children).indexOf(el);

        return retval;
    }

    on_toc_edit ( idx ) : void
    {
        this.listof_text[idx].is_edit = ! this.listof_text[idx].is_edit;
    }

    on_change_toc_entry ( ) : void
    {

    }

    on_event_toggle_toc ( event ) : void
    {
        this.show_toc = ! this.show_toc;
    }

    on_event_update_div ( event ) : void
    {
        this.code_size = event.code_size;

        this.html_size = event.html_size;

        this.resizeFn ( );

        setTimeout( () => { this.resizeFn ( ); }, 10 );
    }

}

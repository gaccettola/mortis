
import { Injectable, NgZone }   from '@angular/core';

import { Observable }           from 'rxjs/Rx';
import { BehaviorSubject }      from "rxjs/Rx";

import { IDesignerTree }            from '../interface/IDesignerTree';
import { IDesignerDragProgress }    from '../interface/IDesignerDragProgress';
import { IDesignerItem }            from '../interface/IDesignerItem';
import { IDesignerItemConnection }  from '../interface/IDesignerItemConnection';
import { IDesignerItemSetting }     from '../interface/IDesignerItemSetting';
import { IDesignerItemTerminal }    from '../interface/IDesignerItemTerminal';
import { IDesignerPoint }           from '../interface/IDesignerPoint';
import { IDesignerUiInstance }      from '../interface/IDesignerUiInstance';

import { DataframeBase, IHttpInvokeResult } from './dataframe.base';

import { DatastoreService, IStoreConfig }   from './datastore.service';

import * as RSVP                from 'rsvp';

@Injectable()
export class DataframeDesignerTreeItemTerminal extends DataframeBase
{
    TYPE_INPUT  : number = 0;
    TYPE_OUTPUT : number = 1;

    store_config    : IStoreConfig =
    {
        store_key   : 'designerTreeItemTerminalId',
        store_name  : 'designerTreeItemTerminal'
    };

    constructor ( protected _ngZone : NgZone,
                  private   _store  : DatastoreService )
    {
        super ( _ngZone );

        _store.init ( this.store_config ).then (

            () => {},
            () => {}

        );
    }

    frameoption () : any
    {
        let retval : any =
        {
            url_part : 'designerTreeItemTerminal',
            verb     : 'POST'
        };

        return retval;
    }

    write ( terminal : IDesignerItemTerminal, uiInstance : IDesignerUiInstance, self ) : Promise<IHttpInvokeResult>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let frame =
            {
                write                       : true,
                designerTreeItemTerminalId  : terminal.designerTreeItemTerminalId,
                businessId                  : uiInstance.tree_selected.businessId,
                designerTreeItemId          : terminal.designerTreeItemId,
                terminalType                : terminal.terminalType,
                idx                         : terminal.idx,
                label                       : terminal.label,
                radius                      : terminal.radius,
                cx                          : terminal.cx,
                cy                          : terminal.cy,
            };

            self.invoke_frame ( frame, self.frameoption () ).then (

                ( value ) =>
                {
                    if ( 200 === value.status )
                    {
                        let data   = JSON.parse ( value.data );
                        let result = data.result[0][0];

                        for ( let i = 0; i < uiInstance.listof_item.length; ++i )
                        {
                            for ( let j = 0; j < uiInstance.listof_item[i].input.length; ++j )
                            {
                                if ( uiInstance.listof_item[i].input[j].idx === result.idx )
                                {
                                    uiInstance.listof_item[i].input[j].designerTreeItemTerminalId = result.designerTreeItemTerminalId;
                                }
                            }

                            for ( let j = 0; j < uiInstance.listof_item[i].output.length; ++j )
                            {
                                if ( uiInstance.listof_item[i].output[j].idx === result.idx )
                                {
                                    uiInstance.listof_item[i].output[j].designerTreeItemTerminalId = result.designerTreeItemTerminalId;
                                }
                            }
                        }

                        resolve ( result );

                    } else
                    {
                        reject ( `!!! ERROR : Status ${ value.status }` );
                    }
                },
                ( error ) =>
                {
                    reject ( error );
                }

            ).catch (

                ( ex ) =>
                {
                    reject ( ex );
                }

            );

        } );
    }

    patch ( terminal : IDesignerItemTerminal, uiInstance : IDesignerUiInstance, self ) : Promise<IHttpInvokeResult>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let frame =
            {
                patch                       : true,
                designerTreeItemTerminalId  : terminal.designerTreeItemTerminalId,
                businessId                  : uiInstance.tree_selected.businessId,
                designerTreeItemId          : terminal.designerTreeItemId,
                terminalType                : terminal.terminalType,
                idx                         : terminal.idx,
                label                       : terminal.label,
                radius                      : terminal.radius,
                cx                          : terminal.cx,
                cy                          : terminal.cy,
            };

            self.invoke_frame ( frame, self.frameoption () ).then (

                ( value ) =>
                {
                    if ( 200 === value.status )
                    {
                        let data   = JSON.parse ( value.data );
                        let result = data.result[0][0];

                        resolve ( result );

                    } else
                    {
                        reject ( `!!! ERROR : Status ${ value.status }` );
                    }
                },
                ( error ) =>
                {
                    reject ( error );
                }

            ).catch (

                ( ex ) =>
                {
                    reject ( ex );
                }

            );

        } );
    }

    persist ( terminal : IDesignerItemTerminal, uiInstance : IDesignerUiInstance, self ) : Promise<any>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let fx_persist;

            if ( 0 < terminal.designerTreeItemTerminalId )
            {
                fx_persist = self.patch;

            } else
            {
                fx_persist = self.write;
            }

            fx_persist ( terminal, uiInstance, self ).then (

                ( value ) =>
                {
                    resolve ( value );
                },
                ( error ) =>
                {
                    throw ( error );
                }

            ).catch
            (
                ( ex ) =>
                {
                    reject ( ex );
                }

            );

        } );
    }

    fetch_tree ( decision_tree : IDesignerTree, uiInstance : IDesignerUiInstance, self ) : Promise<any>
    {
        if ( ! self ) self = this;

        return new Promise ( ( resolve, reject ) => self._ngZone.run ( ( ) =>
        {
            let frame =
            {
                fetch_tree      : true,
                designerTreeId  : decision_tree.designerTreeId
            };

            self.invoke_frame ( frame, self.frameoption ( ) ).then (

                ( value ) =>
                {
                    if ( 200 === value.status )
                    {
                        let data   = JSON.parse ( value.data );
                        let result = data.result[0];

                        for ( let i = 0; i < result.length; ++i )
                        {
                            for ( let j = 0; j < uiInstance.listof_item.length; ++j )
                            {
                                if ( result[i].designerTreeItemId === uiInstance.listof_item[j].designerTreeItemId )
                                {
                                    if ( result[i].terminalType === self.TYPE_INPUT )
                                    {
                                        uiInstance.listof_item[j].input.push ( result[i] );
                                    }

                                    if (result[i].terminalType === self.TYPE_OUTPUT )
                                    {
                                        uiInstance.listof_item[j].output.push ( result[i] );
                                    }

                                }

                            }

                        }

                        resolve ( result );

                    } else
                    {
                        reject ( `!!! ERROR : Status ${ value.status }` );
                    }
                },
                ( error ) =>
                {
                    reject ( error );
                }

            ).catch (

                ( ex ) =>
                {
                    reject ( ex );
                }

            );

        } ) );

    };

    persist_setof_terminal ( uiInstance : IDesignerUiInstance ) : Promise<any>
    {
        let self = this;

        return new Promise ( ( resolve, reject ) => this._ngZone.run ( ( ) =>
        {
            let setof_terminal = [];

            for ( let i = 0; i < uiInstance.listof_item.length; ++i )
            {
                for ( let m = 0; m < uiInstance.listof_item[i].input.length; ++m )
                {
                    setof_terminal.push ( uiInstance.listof_item[i].input[m] );
                }

                for ( let w = 0; w < uiInstance.listof_item[i].output.length; ++w )
                {
                    setof_terminal.push ( uiInstance.listof_item[i].output[w] );
                }

            }

            setof_terminal.reduce ( ( cur, terminal ) =>

                {
                    return cur.then ( ( ) =>
                    {
                        return self.persist ( terminal, uiInstance, self );

                    } );

                }, RSVP.resolve ( true )

            ).then (

                ( ) =>
                {
                    resolve ( '' );
                }

            ).catch (

                ( ex ) =>
                {
                    resolve ( '' );
                }

            );

        } ) );
    }

    fetch_setof_terminal ( uiInstance           : IDesignerUiInstance,
                           listof_decision_tree : IDesignerTree [] ) : Promise<any>
    {
        let self = this;

        return new Promise ( ( resolve, reject ) => this._ngZone.run ( ( ) =>
        {
            this.fetch_tree ( uiInstance.tree_selected, uiInstance, self ).then (

                ( value ) =>
                {
                    resolve ( '' );
                },
                ( error ) =>
                {
                    resolve ( '' );
                }

            ).catch (

                ( ex ) =>
                {
                    resolve ( '' );
                }

            );

        } ) );

    }

}

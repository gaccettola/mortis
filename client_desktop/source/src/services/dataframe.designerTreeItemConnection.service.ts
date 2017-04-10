
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

import { DatastoreService, IStoreConfig } from './datastore.service';

import * as RSVP                from 'rsvp';

@Injectable()
export class DataframeDesignerTreeItemConnection extends DataframeBase
{
    store_config    : IStoreConfig =
    {
        store_key   : 'designerTreeItemConnectionId',
        store_name  : 'designerTreeItemConnection'
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
            url_part : 'designerTreeItemConnection',
            verb     : 'POST'
        };

        return retval;
    }

    write ( designer_connect : IDesignerItemConnection,
            uiInstance   : IDesignerUiInstance,
            self ) : Promise<IHttpInvokeResult>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let frame =
            {
                write            : true,
                designerTreeId   : uiInstance.tree_selected.designerTreeId,
                businessId       : uiInstance.tree_selected.businessId,
                idx              : designer_connect.idx,
                src_terminal_idx : designer_connect.src_terminal_idx,
                dst_terminal_idx : designer_connect.dst_terminal_idx,
                selected         : designer_connect.selected ? 1 : 0,
                src_cx           : designer_connect.src_cx,
                src_cy           : designer_connect.src_cy,
                src_ct           : designer_connect.src_ct,
                dst_cx           : designer_connect.dst_cx,
                dst_cy           : designer_connect.dst_cy,
                dst_ct           : designer_connect.dst_ct,
                path             : designer_connect.path
            };

            self.invoke_frame ( frame, self.frameoption () ).then (

                ( value ) =>
                {
                    let data   = JSON.parse ( value.data );
                    let result = data.result[0][0];

                    for ( let i = 0; i < uiInstance.listof_item_conn.length; ++i )
                    {
                        if ( uiInstance.listof_item_conn[i].idx === result.idx )
                        {
                            uiInstance.listof_item_conn[i].designerTreeItemConnectionId = result.designerTreeItemConnectionId;
                        }
                    }

                    resolve ( result );
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

    patch ( designer_connect : IDesignerItemConnection,
            uiInstance   : IDesignerUiInstance,
            self ) : Promise<IHttpInvokeResult>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let frame =
            {
                patch                           : true,
                designerTreeItemConnectionId    : designer_connect.designerTreeItemConnectionId,
                designerTreeId                  : uiInstance.tree_selected.designerTreeId,
                businessId                      : uiInstance.tree_selected.businessId,
                idx                             : designer_connect.idx,
                src_terminal_idx                : designer_connect.src_terminal_idx,
                dst_terminal_idx                : designer_connect.dst_terminal_idx,
                selected                        : designer_connect.selected ? 1 : 0,
                src_cx                          : designer_connect.src_cx,
                src_cy                          : designer_connect.src_cy,
                src_ct                          : designer_connect.src_ct,
                dst_cx                          : designer_connect.dst_cx,
                dst_cy                          : designer_connect.dst_cy,
                dst_ct                          : designer_connect.dst_ct,
                path                            : designer_connect.path
            };

            self.invoke_frame ( frame, self.frameoption () ).then (

                ( value ) =>
                {
                    let data   = JSON.parse ( value.data );
                    let result = data.result[0][0];

                    for ( let i = 0; i < uiInstance.listof_item_conn.length; ++i )
                    {
                        if ( uiInstance.listof_item_conn[i].idx === result.idx )
                        {
                            uiInstance.listof_item_conn[i].designerTreeItemConnectionId = result.designerTreeItemConnectionId;
                        }
                    }

                    resolve ( result );
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

    persist ( designer_connect : IDesignerItemConnection, uiInstance : IDesignerUiInstance, self ) : Promise<any>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let fx_persist;

            if ( 0 < designer_connect.designerTreeItemConnectionId )
            {
                fx_persist = self.patch;

            } else
            {
                fx_persist = self.write;
            }

            fx_persist ( designer_connect, uiInstance, self ).then (

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

            uiInstance.listof_item_conn = [];

            self.invoke_frame ( frame, self.frameoption ( ) ).then (

                ( value ) =>
                {
                    if ( 200 === value.status )
                    {
                        let data   = JSON.parse ( value.data );
                        let result = data.result[0];

                        for ( let i = 0; i < result.length; ++i )
                        {
                            uiInstance.listof_item_conn.push ( result[i] );
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

    persist_setof_connection ( uiInstance : IDesignerUiInstance ) : Promise<any>
    {
        let self = this;

        return new Promise ( ( resolve, reject ) => this._ngZone.run ( ( ) =>
        {
            uiInstance.listof_item_conn.reduce ( ( cur, designer_connect ) =>

                {
                    return cur.then ( ( ) =>
                    {
                        return self.persist ( designer_connect, uiInstance, self );

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

    fetch_setof_connection ( uiInstance           : IDesignerUiInstance,
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

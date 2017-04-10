
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
export class DataframeDesignerTreeItem extends DataframeBase
{
    store_config    : IStoreConfig =
    {
        store_key   : 'designerTreeItemId',
        store_name  : 'designerTreeItem'
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
            url_part : 'designerTreeItem',
            verb     : 'POST'
        };

        return retval;
    }

    write ( designer_item : IDesignerItem, uiInstance : IDesignerUiInstance, self ) : Promise<IHttpInvokeResult>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let frame =
            {
                write               : true,
                designerTreeItemId  : designer_item.designerTreeItemId,
                designerTreeId      : uiInstance.tree_selected.designerTreeId,
                businessId          : uiInstance.tree_selected.businessId,
                idx                 : designer_item.idx,
                fill                : designer_item.fill,
                radius              : designer_item.radius,
                cx                  : designer_item.cx,
                cy                  : designer_item.cy,
                selected            : designer_item.selected ? 1 : 0,
                min_height          : designer_item.min_height,
                height              : designer_item.height,
                width               : designer_item.width,
                is_primary          : designer_item.is_primary ? 1 : 0,
                message_text        : designer_item.message_text,
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
                            if ( uiInstance.listof_item[i].idx === result.idx )
                            {
                                uiInstance.listof_item[i].designerTreeItemId = result.designerTreeItemId;

                                for ( let m = 0; m < uiInstance.listof_item[i].input.length; ++m )
                                {
                                    uiInstance.listof_item[i].input[m].designerTreeItemId = result.designerTreeItemId;
                                }

                                for ( let w = 0; w < uiInstance.listof_item[i].output.length; ++w )
                                {
                                    uiInstance.listof_item[i].output[w].designerTreeItemId = result.designerTreeItemId;
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
                    throw ( error );
                }

            ).catch (

                ( ex ) =>
                {
                    reject ( ex );
                }

            );

        } );
    }

    patch ( designer_item : IDesignerItem, uiInstance : IDesignerUiInstance, self ) : Promise<IHttpInvokeResult>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let frame =
            {
                patch               : true,
                designerTreeItemId  : designer_item.designerTreeItemId,
                designerTreeId      : uiInstance.tree_selected.designerTreeId,
                businessId          : uiInstance.tree_selected.businessId,
                idx                 : designer_item.idx,
                fill                : designer_item.fill,
                radius              : designer_item.radius,
                cx                  : designer_item.cx,
                cy                  : designer_item.cy,
                selected            : designer_item.selected ? 1 : 0,
                min_height          : designer_item.min_height,
                height              : designer_item.height,
                width               : designer_item.width,
                is_primary          : designer_item.is_primary ? 1 : 0,
                message_text        : designer_item.message_text,
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
                            if ( uiInstance.listof_item[i].idx === result.idx )
                            {
                                uiInstance.listof_item[i].designerTreeItemId = result.designerTreeItemId;
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
                    throw ( error );
                }

            ).catch (

                ( ex ) =>
                {
                    reject ( ex );
                }

            );

        } );
    }

    persist ( designer_item : IDesignerItem, uiInstance : IDesignerUiInstance ) : Promise<any>
    {
        let self = this;

        return new Promise ( ( resolve, reject ) =>
        {
            let fx_persist;

            if ( 0 < designer_item.designerTreeItemId )
            {
                fx_persist = self.patch;

            } else
            {
                fx_persist = self.write;
            }

            fx_persist ( designer_item, uiInstance, self ).then (

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

            uiInstance.listof_item = [];

            self.invoke_frame ( frame, self.frameoption ( ) ).then (

                ( value ) =>
                {
                    if ( 200 === value.status )
                    {
                        let data   = JSON.parse ( value.data );
                        let result = data.result[0];

                        for ( let i = 0; i < result.length; ++i )
                        {
                            uiInstance.listof_item.push ( this.adjust_designer_item ( result[i] ) );
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

    adjust_designer_item ( designer_item : IDesignerItem ) : IDesignerItem
    {
        designer_item.input  = [];
        designer_item.output = [];

        return designer_item;
    }

    persist_setof_item ( uiInstance : IDesignerUiInstance ) : Promise<any>
    {
        return new Promise ( ( resolve, reject ) => this._ngZone.run ( ( ) =>
        {
            uiInstance.listof_item.reduce ( ( cur, designer_item ) =>

                {
                    return cur.then ( ( ) =>
                    {
                        return this.persist ( designer_item, uiInstance );

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

    fetch_setof_item ( uiInstance           : IDesignerUiInstance,
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

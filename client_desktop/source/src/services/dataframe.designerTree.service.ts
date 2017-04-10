
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
export class DataframeDesignerTree extends DataframeBase
{
    store_config    : IStoreConfig =
    {
        store_key   : 'designerTreeId',
        store_name  : 'designerTree'
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

    frameoption ( ) : any
    {
        let retval : any =
        {
            url_part : 'designerTree',
            verb     : 'POST'
        };

        return retval;
    }

    write (tree_selected : IDesignerTree, self ) : Promise<IHttpInvokeResult>
    {
        if ( ! self ) self = this;

        return new Promise ( ( resolve, reject ) => self._ngZone.run ( ( ) =>
        {
            let frame =
            {
                write               : true,
                businessId          : tree_selected.businessId || 0,
                designerTreeName    : tree_selected.designerTreeName,
                designerTreeDesc    : tree_selected.designerTreeDesc
            };

            self.invoke_frame ( frame, self.frameoption ( ) ).then (

                ( value ) =>
                {
                    if ( 200 === value.status )
                    {
                        let data = JSON.parse ( value.data );

                        resolve ( data.result );

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
    }

    patch (tree_selected : IDesignerTree, self ) : Promise<IHttpInvokeResult>
    {
        if ( ! self ) self = this;

        return new Promise ( ( resolve, reject ) => self._ngZone.run ( ( ) =>
        {
            let frame =
            {
                patch               : true,
                designerTreeId      : tree_selected.designerTreeId,
                businessId          : tree_selected.businessId || 0,
                designerTreeName    : tree_selected.designerTreeName,
                designerTreeDesc    : tree_selected.designerTreeDesc
            };

            self.invoke_frame ( frame, self.frameoption ( ) ).then (

                ( value ) =>
                {
                    if ( 200 === value.status )
                    {
                        let data = JSON.parse ( value.data );

                        resolve ( data.result );

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

    }

    persist_tree ( uiInstance : IDesignerUiInstance ) : Promise<any>
    {
        let self = this;

        return new Promise ( ( resolve, reject ) =>
        {
            let fx_persist;

            if ( uiInstance.tree_selected.designerTreeId && 0 < uiInstance.tree_selected.designerTreeId )
            {
                fx_persist = self.patch;

            } else
            {
                fx_persist = self.write;
            }

            fx_persist ( uiInstance.tree_selected, self ).then (

                ( value ) =>
                {
                    uiInstance.tree_selected = value;

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

    fetch_all (uiInstance : IDesignerUiInstance, self ) : Promise<any>
    {
        if ( ! self ) self = this;

        return new Promise ( ( resolve, reject ) => self._ngZone.run ( ( ) =>
        {
            let frame =
            {
                fetch_all : true,
            };

            self.invoke_frame ( frame, self.frameoption ( ) ).then (

                ( value ) =>
                {
                    if ( 200 === value.status )
                    {
                        let data = JSON.parse ( value.data );

                        resolve ( data.result );

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

    }

    fetch_tree (uiInstance : IDesignerUiInstance, listof_decision_tree : IDesignerTree [] ) : Promise<any>
    {
        let self = this;

        return new Promise ( ( resolve, reject ) => this._ngZone.run ( ( ) =>
        {
            self.fetch_all ( uiInstance, self ).then (

                ( value ) =>
                {
                    for ( let i = 0; i < value.length; ++i )
                    {
                        listof_decision_tree.push ( value[i] );
                    }

                    uiInstance.tree_selected = listof_decision_tree[0];

                    uiInstance.tree_selected_idx = 0;

                    resolve ( value );
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

        } ) );

    }

}

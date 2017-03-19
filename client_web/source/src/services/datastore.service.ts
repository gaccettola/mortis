
import { Injectable }   from '@angular/core';

import * as localForage from "localforage";

export interface IStoreConfig
{
    store_key  : string,
    store_name : string
}

@Injectable()
export class DatastoreService
{
    _config : IStoreConfig;
    _store  : any;

    constructor ( )
    {
    }

    init ( config : IStoreConfig ) : Promise<any>
    {
        this._config = config;

        return this.store_init ( );

    }

    store_init ( ) : Promise<any>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            if ( this._store )
            {
                resolve ( true );

            } else
            {
                this._store = localForage.createInstance (
                {
                    name      : 'mortis_web_client',
                    storeName : this._config.store_name

                } );

                resolve ( true );
            }

        } );

    }

    setItem ( key : any, value : any ) : Promise<any>
    {
        return new Promise ( ( resolve, reject )  =>
        {
            this.store_init ( ).then ( ( ) =>
            {
                this._store.setItem (

                    this._config.store_key,
                    value

                ).then (

                    ( val ) =>
                    {
                        resolve ( value );
                    }

                ).catch (

                    ( err ) =>
                    {
                        reject ( err );
                    }
                );

            } );

        } );
    }

    getItem ( key : any ) : Promise<any>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            this.store_init ( ).then ( ( ) =>
            {
                this._store.getItem (

                    this._config.store_key

                ).then (

                    ( value ) =>
                    {
                        resolve ( value );
                    }

                ).catch (

                    ( err ) =>
                    {
                        reject ( err );
                    }
                );

            } );

        } );
    }

    removeItem ( key : any ) : Promise<any>
    {
        return new Promise ( ( resolve, reject )  =>
        {
            this.store_init ( ).then ( ( ) =>
            {
                this._store.removeItem ( key ).then (

                    ( value ) =>
                    {
                        resolve ( value );
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

        } );
    }

}

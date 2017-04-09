
import { Injectable, NgZone }   from '@angular/core';

import { Observable }       from 'rxjs/Rx';
import { BehaviorSubject }  from "rxjs/Rx";

import { DataframeBase, IHttpInvokeResult } from './dataframe.base';

import { DatastoreService, IStoreConfig } from './datastore.service';

@Injectable()
export class DataframeAccount extends DataframeBase
{
    store_config    : IStoreConfig =
    {
        store_key   : 'PK_Account',
        store_name  : 'Account'
    };

    account_token           : any;
    account_token_subject   = new BehaviorSubject( this.account_token );

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
            url_part : 'account',
            verb     : 'POST'
        };

        return retval;
    }

    observe_account_token ( ) : Observable<any>
    {
        return this.account_token_subject.asObservable();
    }

    login ( payload ) : Promise<any>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let frame =
            {
                login       : true,
                userName    : payload.userName,
                password    : payload.password
            };

            this.invoke_frame ( frame, this.frameoption () ).then (

                ( value ) =>
                {
                    if ( 200 === value.status )
                    {
                        this.account_token = JSON.parse ( value.data );

                    } else
                    {
                        this.account_token = null;
                    }

                    return this._store.setItem (

                        this.store_config.store_key,
                        this.account_token

                    );

                },
                ( error ) =>
                {
                    throw ( error );
                }

            ).then (

                ( value ) =>
                {
                    this.account_token_subject.next ( this.account_token );

                    resolve ( this.account_token );
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

    logout ( ) : Promise<any>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            this._store.removeItem ( this.store_config.store_key ).then (

                ( value ) =>
                {
                    this.account_token = null;

                    this.account_token_subject.next ( this.account_token );

                    resolve ( );
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

    /**
     * Sign-up for a new account
     */
    write ( payload ) : Promise<IHttpInvokeResult>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let frame =
            {
                write       : true,
                userName    : payload.userName,
                password    : payload.password
            };

            this.invoke_frame ( frame, this.frameoption () ).then (

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
    }

    check ( payload ) : Promise<IHttpInvokeResult>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            let frame =
            {
                check    : true,
                userName : payload.userName,
                token    : payload.token
            };

            this.invoke_frame ( frame, this.frameoption () ).then (

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
    }

    isvalid_account ( value ) : boolean
    {
        let retval : boolean = false;

        if ( ! value )
            return retval;

        if ( ! value.result )
            return retval;

        if ( ! value.result.success )
            return retval;

        if ( ! value.result.token )
            return retval;

        if ( ! value.result.userName )
            return retval;

        retval = true;

        return retval;
    }

    set_account_token ( token : any )
    {
        this.account_token = token;

        this.account_token_subject.next ( this.account_token );
    }

    read ( ) : Promise<any>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            this._store.getItem ( this.store_config.store_key ).then (

                ( value ) =>
                {
                    if ( this.isvalid_account ( value ) )
                    {
                        resolve ( value );

                    } else
                    {
                        throw ( `ERROR : Invalid dataframe.account` );
                    }

                },
                ( error ) =>
                {
                    throw ( error );
                }

            ).catch (

                ( ex ) =>
                {
                    console.log ( `ERROR : Unable to read dataframe account -`, ex );

                    reject ( ex );
                }

            );

        } );

    }

    is_logged_in ( ) : Promise<boolean>
    {
        return new Promise ( ( resolve, reject ) =>
        {
            this._store.getItem ( this.store_config.store_key ).then (

                ( value ) =>
                {
                    if ( this.isvalid_account ( value ) )
                    {
                        let payload =
                        {
                            userName : value.result.userName,
                            token    : value.result.token
                        };

                        return this.check ( payload );

                    } else
                    {
                        throw ( false );
                    }

                },
                ( error ) =>
                {
                    throw ( false );
                }

            ).then (

                ( value ) =>
                {
                    resolve ( true );
                },
                ( error ) =>
                {
                    throw ( false );
                }

            ).catch (

                ( ex ) =>
                {
                    resolve ( false );
                }

            );

        } );
    }

}

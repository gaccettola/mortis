
/*jslint node: true */
'use strict';

var dotenv  = require ( 'dotenv'   ).config(),
    Promise = require ( 'bluebird' ),
    RSVP    = require ( 'rsvp'     ),
    chalk   = require ( 'chalk'    );

var proxy_installer = require ( './storage_proxy_installer' )();

// ////////////////////////////////////////////////////////////////////////////
//
// storage proxy, database .. stuff
//
//

module.exports = function ( )
{
    var vm = this || {};

    vm._service_name = 'storage_proxy';

    vm.api =
    {
        ctor         : ctor,

        service_name : service_name
    };

    function ctor ( central_relay, storage_agent )
    {
        return new Promise ( function ( resolve, reject )
        {
            var retval = false;

            // ////////////////////////////////////////////////////////////////
            //
            // framework resources

            vm.central_relay = central_relay;
            vm.storage_agent = storage_agent;

            // ////////////////////////////////////////////////////////////////
            //
            // instance setup

            service_init ( ).then (

                function ( value )
                {

                },
                function ( error )
                {
                    throw ( error )
                }

            ).catch (

                function ( ex )
                {
                    console.log ( chalk.green ( '!!! ERROR : Unable to load -', vm._service_name ) );
                }

            ).finally (

                function ( )
                {

                    // ////////////////////////////////////////////////////////////////
                    //
                    // subscriptions


                    // ////////////////////////////////////////////////////////////////

                    console.log ( chalk.green ( 'on the line :', service_name ( ) ) );

                    retval = true;

                    resolve ( retval );

                }

            );

        } );

    }

    function service_name ( )
    {
        return vm._service_name;
    }

    function service_init ( )
    {
        return new Promise ( function ( resolve, reject )
        {
            vm.listof_database_script = proxy_installer.rc_reader ( );

            vm.listof_database_script.reduce ( function ( cur, database_script )

                {
                    return cur.then ( function ( )
                    {
                        return vm.storage_agent.connection_exec ( database_script.script );

                    } );

                }, RSVP.resolve ( )

            ).then (

                function ( )
                {
                    resolve ( '' );
                }

            ).catch (

                function ( ex )
                {
                    resolve ( '' );
                }

            );

        } );

    }
    
    return vm.api;
};


/*jslint node: true */
'use strict';

var dotenv  = require ( 'dotenv'   ).config(),
    Promise = require ( 'bluebird' ),
    chalk   = require ( 'chalk'    ),
    RSVP    = require ( 'rsvp'     ),
    fs      = require ( 'fs'       );

// ////////////////////////////////////////////////////////////////////////////
//
// restapi proxy, express router
//
//

module.exports = function ( restapi_agent )
{
    var vm = this || {};

    vm._service_name            = 'restapi_proxy';

    vm.listof_controller_path   = [];

    vm.listof_controller        = [];

    vm.api =
    {
        ctor         : ctor,

        service_name : service_name
    };

    function ctor ( central_relay, storage_agent, restapi_agent )
    {
        return new Promise ( function ( resolve, reject )
        {
            var retval = false;

            // ////////////////////////////////////////////////////////////////
            //
            // framework resources

            vm.central_relay = central_relay;
            vm.storage_agent = storage_agent;
            vm.restapi_agent = restapi_agent;

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
            vm.listof_controller_path = fs.readdirSync ( './controller/' );

            vm.listof_controller_path.reduce ( function ( cur, controller_path )

                {
                    return cur.then ( function()
                    {
                        var rest_controller =  require ( '../controller/' + controller_path )( );

                        return rest_controller.ctor ( vm.central_relay, vm.storage_agent, vm.restapi_agent );

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

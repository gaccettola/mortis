
/*jslint node: true */
'use strict';

// ////////////////////////////////////////////////////////////////////////////
//
// system requirements,

var dotenv      = require ( 'dotenv'            ).config(),
    Promise     = require ( 'bluebird'          ),
    chalk       = require ( 'chalk'             ),
    _           = require ( 'lodash'            ),
    RSVP        = require ( 'rsvp'              ),
    Stopwatch   = require ( 'statman-stopwatch' ),
    schedule    = require ( 'node-schedule'     ),
    sprintf     = require ( 'sprintf'           );

// ////////////////////////////////////////////////////////////////////////////
//
// common requirements,

var constant_server_restapi = require ( '../common/constant_server_restapi' );

// ////////////////////////////////////////////////////////////////////////////
//
// storage_agent, database connection pool
//
//

module.exports = function ( )
{
    var vm = this || {};

    vm._service_name = 'cronjob_agent';

    vm.api =
    {
        ctor            : ctor,

        service_name    : service_name
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

            ).then (

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
            /******************************************************************
             *
             * cron format

             *    *    *    *    *    *
             ┬    ┬    ┬    ┬    ┬    ┬
             │    │    │    │    │    |
             │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
             │    │    │    │    └───── month (1 - 12)
             │    │    │    └────────── day of month (1 - 31)
             │    │    └─────────────── hour (0 - 23)
             │    └──────────────────── minute (0 - 59)
             └───────────────────────── second (0 - 59, OPTIONAL)
             */


            for ( var min = 0 ; min < 60 ; min++ )
            {
                schedule_minute ( min );
            }

            resolve ( true );

        } );

    }

    function schedule_minute ( min )
    {
        var rule = new schedule.RecurrenceRule();

        rule.minute = min;

        schedule.scheduleJob ( rule, function()
        {
            vm.central_relay.publish ( constant_server_restapi.scheduled_minute,
            {
                info : min

            } );

        } );
    }

    return vm.api;

};

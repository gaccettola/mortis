
/*jslint node: true */
'use strict';

var dotenv      = require ( 'dotenv'            ).config(),
    Promise     = require ( 'bluebird'          ),
    chalk       = require ( 'chalk'             ),
    RSVP        = require ( 'rsvp'              ),
    Stopwatch   = require ( 'statman-stopwatch' ),
    sprintf     = require ( 'sprintf'           ),
    mysql       = require ( 'mysql'             );

// ////////////////////////////////////////////////////////////////////////////
//
// storage_agent, database connection pool
//
//

module.exports = function ( )
{
    var vm = this || {};

    vm._service_name = 'storage_agent';

    vm.api =
    {
        ctor            : ctor,

        service_name    : service_name,

        connection_pool : connection_pool,
        connection_exec : connection_exec
    };

    function ctor ( central_relay )
    {
        return new Promise ( function ( resolve, reject )
        {
            var retval = false;

            // ////////////////////////////////////////////////////////////////
            //
            // framework resources

            vm.central_relay = central_relay;

            // ////////////////////////////////////////////////////////////////
            //
            // instance setup

            service_init ( ).then (

                function ( value )
                {
                    var query_script = 'SELECT 1 AS Online;';

                    return connection_exec ( query_script );

                    // var iteration_count = 100000;

                    // return connection_stress ( iteration_count );

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
            vm.connection_pool  = mysql.createPool (
            {
                connectionLimit : process.env.DB_SERVER_CONNECTION_LIMIT,
                host            : process.env.DB_SERVER_HOST,
                port            : process.env.DB_SERVER_PORT,
                database        : process.env.DB_SERVER_DATA,
                user            : process.env.DB_SERVER_USER,
                password        : process.env.DB_SERVER_PASS

            } );

            resolve ( vm.connection_pool );

        } );

    }

    function connection_pool ( )
    {
        return new Promise ( function ( resolve, reject )
        {
            resolve ( vm.connection_pool );

        } );
    }

    function connection_exec ( query_script )
    {
        return new Promise ( function ( resolve, reject )
        {
            vm.connection_pool.getConnection ( function ( err_conn, conn )
            {
                if ( err_conn )
                {
                    console.log ( chalk.red ( 'connection complete, with error - ', err_conn ) );

                    reject ( err_conn );

                } else
                {
                    conn.query ( query_script, function ( err_query, rows )
                    {
                        conn.release();

                        if ( err_query )
                        {
                            console.log ( chalk.red ( 'query complete, with error - ', err_query ) );

                            reject ( err_query );

                        } else
                        {
                            resolve ( rows );
                        }

                    } );

                }

            } );

        } );

    }

    function connection_stress ( iteration_count )
    {
        console.log ( chalk.green ( 'starting connection stress :', iteration_count) );

        return new Promise ( function ( resolve, reject )
        {
            var array = Array.apply ( null, { length : iteration_count } ).map (

                function( value, index )
                {
                    return index + 1;
                }
            );

            var complete_good = 0;
            var complete_fail = 0;

            vm.sw = new Stopwatch ( true );

            array.reduce (

                function ( cur, itemin_array )
                {
                    return cur.then ( function()
                    {
                        var query_script = sprintf ( "SELECT %s AS Online;",
                            mysql.escape( itemin_array )
                        );

                        return connection_exec ( query_script ).then (

                            function ( value )
                            {
                                ++complete_good;
                            },
                            function ( error )
                            {
                                ++complete_fail;

                                throw ( error );
                            }

                        ).catch (

                            function ( ex )
                            {
                                console.log ( chalk.red ( 'connection_exec complete, with error -', ex ) );
                            }

                        );

                    } );

                }, RSVP.resolve ( )

            ).then (

                function ( )
                {
                    var delta = vm.sw.read ( );

                    delta = delta * ( 1/1000 );

                    vm.sw.stop ( );

                    var transactions_per_second = Math.floor ( complete_good / delta );

                    var query_result = sprintf ( "complete : %d, \nfailure  : %d, \nseconds  : %s, \ntps      : %s",
                        complete_good,
                        complete_fail,
                        delta,
                        transactions_per_second );

                    console.log ( chalk.yellow ( query_result ) );

                    resolve ( '' );
                }

            ).catch (

                function ( ex )
                {
                    console.log ( chalk.red ( 'connection stress complete, with error -', ex ) );

                    resolve ( '' );
                }

            );

        } );

    }

    return vm.api;

};


/*jslint node: true */
'use strict';

var dotenv      = require ( 'dotenv'      ).config(),
    Promise     = require ( 'bluebird'    ),
    chalk       = require ( 'chalk'       ),
    express     = require ( 'express'     ),
    morgan      = require ( 'morgan'      ),
    cors        = require ( 'cors'        ),
    compression = require ( 'compression' ),
    bodyParser  = require ( 'body-parser' );

// ////////////////////////////////////////////////////////////////////////////
//
// restapi agent, express instance
//
//

module.exports = function ( )
{
    var vm = this || {};

    vm._service_name = 'restapi_agent';

    vm.api =
    {
        ctor         : ctor,

        service_name : service_name,

        express_get  : express_get
    };

    function ctor ( central_relay, storage_agent )
    {
        return new Promise ( function ( resolve, reject )
        {
            var retval = false;

            vm.central_relay = central_relay;
            vm.storage_agent = storage_agent;

            // ////////////////////////////////////////////////////////////////

            vm.app = express ();

            vm.app.use ( morgan ( 'dev' ) );

            vm.app.use ( on_preflight );

            vm.corsOptions =
            {
                origin          : '*',
                methods         : [ 'POST', 'PUT', 'GET' ],
                exposedHeaders  : [ 'Content-Encoding', 'Content-Length', 'Content-Range' ]
            };

            vm.app.use ( '*', cors ( vm.corsOptions ) );

            vm.app.use ( compression (

                {
                    filter : function ( req, res )
                    {
                        return ( /json|text|javascript|css/ ).test( res.getHeader('Content-Type') );
                    },

                    level  : 9
                }

            ) );

            vm.app.use ( bodyParser.json() );

            vm.app.use ( bodyParser.urlencoded ( { extended: true, parameterLimit: 1048576 } ) );

            // ////////////////////////////////////////////////////////////////

            vm.central_relay.subscribe ( 'restapi_listen', on_central_relay_restapi_listen );

            // ////////////////////////////////////////////////////////////////

            console.log ( chalk.green ( 'on the line :', service_name ( ) ) );

            retval = true;

            resolve ( retval );

        } );

    }

    function service_name ( )
    {
        return vm._service_name;
    }

    function on_preflight ( req, res, next )
    {
        res.header ( "Access-Control-Allow-Origin", "*" );

        res.header ( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );

        next();
    }

    function express_get ()
    {
        return vm.app;
    }

    function on_central_relay_restapi_listen ( data, envelope )
    {
        vm.http_server = vm.app.listen ( process.env.SERVER_RESTAPI_PORT, function ( )
        {
            console.log ( chalk.green ( 'system online and listening' ) );

        } );
    }

    return vm.api;
};


/*jslint node: true */
'use strict';

var dotenv  = require ( 'dotenv'   ).config(),
    Promise = require ( 'bluebird' ),
    chalk   = require ( 'chalk'    );

// ////////////////////////////////////////////////////////////////////////////
//
// restapi proxy, express router
//
//

module.exports = function ( restapi_agent )
{
    var vm = this || {};

    vm._service_name = 'restapi_proxy';

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

            vm.central_relay = central_relay;
            vm.storage_agent = storage_agent;
            vm.restapi_agent = restapi_agent;

            console.log ( chalk.green ( 'on the line :', service_name ( ) ) );

            retval = true;

            resolve ( retval );

        } );

    }

    function service_name ( )
    {
        return vm._service_name;
    }

    return vm.api;
};

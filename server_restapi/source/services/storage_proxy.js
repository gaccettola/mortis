
/*jslint node: true */
'use strict';

var dotenv  = require ( 'dotenv'   ).config(),
    Promise = require ( 'bluebird' ),
    chalk   = require ( 'chalk'    );

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

            vm.central_relay = central_relay;
            vm.storage_agent = storage_agent;

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

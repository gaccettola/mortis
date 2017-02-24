
/*jslint node: true */
'use strict';

var dotenv  = require ( 'dotenv'   ).config(),
    Promise = require ( 'bluebird' ),
    chalk   = require ( 'chalk'    );

// ////////////////////////////////////////////////////////////////////////////
//
// central_relay, in-memory message bus
//
//

module.exports = function ( )
{
    var vm = this || {};

    vm._service_name = 'central_relay';

    vm.api =
    {
        ctor         : ctor,

        service_name : service_name
    };

    function ctor ( )
    {
        return new Promise ( function ( resolve, reject )
        {
            var retval = false;

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

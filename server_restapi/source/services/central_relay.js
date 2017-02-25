
/*jslint node: true */
'use strict';

var dotenv  = require ( 'dotenv'   ).config(),
    Promise = require ( 'bluebird' ),
    postal  = require ( 'postal'   ),
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

        service_name : service_name,

        subscribe    : subscribe,
        publish      : publish
    };

    function ctor ( )
    {
        return new Promise ( function ( resolve, reject )
        {
            var retval = false;

            console.log ( chalk.green ( 'on the line :', service_name ( ) ) );

            // ////////////////////////////////////////////////////////////////

            service_init ( );

            // ////////////////////////////////////////////////////////////////

            retval = true;

            resolve ( retval );

        } );

    }

    function service_name ( )
    {
        return vm._service_name;
    }

    function service_init ( )
    {
        if ( ! vm.instanceof_postal )
        {
            vm.instanceof_postal = postal.channel ( vm._service_name );
        }
    }

    function subscribe ( message_topic, message_handler )
    {
        service_init ( );

        var subscription =
        {
            channel  : vm._service_name,
            topic    : message_topic,
            callback : message_handler
        };

        return vm.instanceof_postal.subscribe ( subscription );
    }

    function publish ( message_topic, message_content )
    {
        var envelope =
        {
            channel  : vm._service_name,
            topic    : message_topic,
            data     : message_content
        };

        vm.instanceof_postal.publish ( envelope );
    }

    return vm.api;
};

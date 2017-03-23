
/*jslint node: true */
'use strict';

var dotenv      = require ( 'dotenv'     ).config(),
    Promise     = require ( 'bluebird'   ),
    _           = require ( 'lodash'     ),
    sprintf     = require ( 'sprintf'    ),
    mysql       = require ( 'mysql'      ),
    httpinvoke  = require ( 'httpinvoke' ),
    chalk       = require ( 'chalk'      );

var url_base    = 'http://localhost:8989/v1/';

module.exports = function ( )
{
    var vm = this || {};

    vm._service_name = 'dataframe.base';

    var api =
    {
        invoke_frame : invoke_frame
    };

    /**
     *
     * @param frame
     * @param option.url_part
     * @param option.verb
     */
    function invoke_frame ( frame, option )
    {
        return new Promise ( function ( resolve, reject )
        {
            var encoded_frame = Object.keys ( frame ).map ( function ( key )
            {
                return encodeURIComponent ( key ) + '=' + encodeURIComponent ( frame [ key ] );

            } ).join ( '&' );

            var url_complete = url_base + option.url_part;

            httpinvoke ( url_complete, option.verb,
                {
                    headers :
                        {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                    input   : encoded_frame

                },
                function ( error, data, status, header )
                {
                    var retval  =
                        {
                            error   : error,
                            data    : data,
                            status  : status,
                            header  : header
                        };

                    if ( retval && 200 === retval.status )
                    {
                        resolve ( retval );

                    } else
                    {
                        reject ( retval );
                    }

                } );

        } );
    }


    return api;

};
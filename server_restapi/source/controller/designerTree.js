
/*jslint node: true */
'use strict';

var dotenv  = require ( 'dotenv'   ).config(),
    Promise = require ( 'bluebird' ),
    _       = require ( 'lodash'   ),
    sprintf = require ( 'sprintf'  ),
    mysql   = require ( 'mysql'    ),
    chalk   = require ( 'chalk'    );

// ////////////////////////////////////////////////////////////////////////////
//
// common requirements,

var constant_server_restapi = require ( '../common/constant_server_restapi' );

var _controllerBase         = require ( './_controllerBase' )();

module.exports = function ( )
{
    var vm = this || {};

    vm._service_name = 'designerTree';

    var api =
    {
        ctor         : ctor
    };

    function ctor ( central_relay, storage_agent, protect_agent, restapi_agent )
    {
        return _controllerBase.bind_ctor (

            vm, service_init, service_name, central_relay,
            storage_agent, protect_agent, restapi_agent

        );

    }

    function service_name ( )
    {
        return vm._service_name;
    }

    function service_init ( )
    {
        return new Promise ( function ( resolve, reject )
        {
            var express = vm.restapi_agent.express_get ();

            express.post ( '/v1/' + vm._service_name, on_restapi_post );

            resolve ( true );

        } );
    }

    /**
     *
     * @param req.body.designerTreeId
     */
    function fetch_one ( req, res, next )
    {
        var sp_script = sprintf ( 'CALL %s( %s );',
            'sp_designerTree_fetch_one',
            mysql.escape ( req.body.designerTreeId )
        );

        return _controllerBase.sp_exec_one ( req, res, next, vm, sp_script );
    }

    /**
     *
     */
    function fetch_all ( req, res, next )
    {
        var sp_script = sprintf ( 'CALL %s( );',
            'sp_designerTree_fetch_all'
        );

        return _controllerBase.sp_exec_all ( req, res, next, vm, sp_script );
    }

    /**
     *
     * @param req.body.designerTreeId
     * @param req.body.businessId
     * @param req.body.designerTreeName
     * @param req.body.designerTreeDesc
     */
    function patch ( req, res, next )
    {
        var sp_script = sprintf ( 'CALL %s( %s, %s, %s, %s );',
            'sp_designerTree_patch',
            mysql.escape ( req.body.designerTreeId ),
            mysql.escape ( req.body.businessId ),
            mysql.escape ( req.body.designerTreeName ),
            mysql.escape ( req.body.designerTreeDesc )
        );

        return _controllerBase.sp_exec_one ( req, res, next, vm, sp_script );
    }

    /**
     *
     * @param req.body.businessId
     * @param req.body.designerTreeName
     * @param req.body.designerTreeDesc
     */
    function write ( req, res, next )
    {
        var sp_script = sprintf ( 'CALL %s( %s, %s, %s );',
            'sp_designerTree_write',
            mysql.escape ( req.body.businessId ),
            mysql.escape ( req.body.designerTreeName ),
            mysql.escape ( req.body.designerTreeDesc )
        );

        return _controllerBase.sp_exec_one ( req, res, next, vm, sp_script );
    }


    function on_restapi_post ( req, res, next )
    {
        if ( req.body.fetch_one ) return fetch_one ( req, res, next );

        if ( req.body.fetch_all ) return fetch_all ( req, res, next );

        if ( req.body.patch ) return patch ( req, res, next );

        if ( req.body.write ) return write ( req, res, next );

        return request_status_send ( res, 400, { error : 'bad request' } );
    }

    return api;

};
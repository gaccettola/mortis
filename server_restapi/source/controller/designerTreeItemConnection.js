
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

    vm._service_name = 'designerTreeItemConnection';

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
     * @param req.body.designerTreeItemConnectionId
     */
    function fetch ( req, res, next )
    {
        var sp_script = sprintf ( 'CALL %s( %s );',
            'sp_designerTreeItemConnection_fetch',
            mysql.escape ( req.body.designerTreeItemConnectionId )
        );

        return _controllerBase.sp_exec ( req, res, next, vm, sp_script );
    }

    /**
     *
     * @param req.body.designerTreeConnectionId
     */
    function patch ( req, res, next )
    {
        var sp_script = sprintf ( 'CALL %s( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s  );',
            'sp_designerTreeItemConnection_patch',
            mysql.escape ( req.body.designerTreeItemConnectionId ),
            mysql.escape ( req.body.designerTreeId ),
            mysql.escape ( req.body.businessId ),
            mysql.escape ( req.body.idx ),
            mysql.escape ( req.body.src_terminal_idx ),
            mysql.escape ( req.body.dst_terminal_idx ),
            mysql.escape ( req.body.selected ),
            mysql.escape ( req.body.src_cx ),
            mysql.escape ( req.body.src_cy ),
            mysql.escape ( req.body.src_ct ),
            mysql.escape ( req.body.dst_cx ),
            mysql.escape ( req.body.dst_cy ),
            mysql.escape ( req.body.dst_ct ),
            mysql.escape ( req.body.path )

        );

        return _controllerBase.sp_exec ( req, res, next, vm, sp_script );
    }

    /**
     *
     * @param req.body.name
     * @param req.body.description
     * @param req.body.note
     */
    function write ( req, res, next )
    {
        var sp_script = sprintf ( 'CALL %s( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s  );',
            'sp_designerTreeItemConnection_write',
            mysql.escape ( req.body.designerTreeId ),
            mysql.escape ( req.body.businessId ),
            mysql.escape ( req.body.idx ),
            mysql.escape ( req.body.src_terminal_idx ),
            mysql.escape ( req.body.dst_terminal_idx ),
            mysql.escape ( req.body.selected ),
            mysql.escape ( req.body.src_cx ),
            mysql.escape ( req.body.src_cy ),
            mysql.escape ( req.body.src_ct ),
            mysql.escape ( req.body.dst_cx ),
            mysql.escape ( req.body.dst_cy ),
            mysql.escape ( req.body.dst_ct ),
            mysql.escape ( req.body.path )

        );

        return _controllerBase.sp_exec ( req, res, next, vm, sp_script );
    }

    /**
     *
     * @param req.body.designerTreeId
     */
    function fetch_tree ( req, res, next )
    {
        var sp_script = sprintf ( 'CALL %s( %s );',
            'sp_designerTreeItemConnection_fetch_tree',
            mysql.escape ( req.body.designerTreeId )
        );

        return _controllerBase.sp_exec ( req, res, next, vm, sp_script );
    }

    function on_restapi_post ( req, res, next )
    {
        if ( req.body.fetch ) return fetch ( req, res, next );

        if ( req.body.patch ) return patch ( req, res, next );

        if ( req.body.write ) return write ( req, res, next );

        if ( req.body.fetch_tree ) return fetch_tree ( req, res, next );

        return _controllerBase.request_status_send ( res, 400, { error : 'bad request' } );
    }

    return api;

};
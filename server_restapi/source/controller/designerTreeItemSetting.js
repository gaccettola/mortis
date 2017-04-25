
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

    vm._service_name = 'designerTreeItemSetting';

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
     * @param req.body.designerTreeItemSettingId
     */
    function fetch ( req, res, next )
    {
        var sp_script = sprintf ( 'CALL %s( %s );',
            'sp_designerTreeItemSetting_fetch',
            mysql.escape ( req.body.designerTreeItemSettingId )
        );

        return _controllerBase.sp_exec ( req, res, next, sp_script );
    }

    /**
     *
     * @param req.body.designerTreeItemSettingId
     * @param req.body.name
     * @param req.body.description
     * @param req.body.note
     */
    function patch ( req, res, next )
    {
        var sp_script = sprintf ( 'CALL %s( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s  );',
            'sp_designerTreeItemSetting_patch',
            mysql.escape ( req.body.designerTreeItemSettingId ),
            mysql.escape ( req.body.designerTreeId ),
            mysql.escape ( req.body.businessId ),
            mysql.escape ( req.body.idx ),
            mysql.escape ( req.body.fill ),
            mysql.escape ( req.body.radius ),
            mysql.escape ( req.body.cx ),
            mysql.escape ( req.body.cy ),
            mysql.escape ( req.body.selected ),
            mysql.escape ( req.body.min_height ),
            mysql.escape ( req.body.height ),
            mysql.escape ( req.body.width ),
            mysql.escape ( req.body.is_primary ),
            mysql.escape ( req.body.message_text )

        );

        return _controllerBase.sp_exec ( req, res, next, sp_script );
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
            'sp_designerTreeItemSetting_write',
            mysql.escape ( req.body.designerTreeId ),
            mysql.escape ( req.body.businessId ),
            mysql.escape ( req.body.idx ),
            mysql.escape ( req.body.fill ),
            mysql.escape ( req.body.radius ),
            mysql.escape ( req.body.cx ),
            mysql.escape ( req.body.cy ),
            mysql.escape ( req.body.selected ),
            mysql.escape ( req.body.min_height ),
            mysql.escape ( req.body.height ),
            mysql.escape ( req.body.width ),
            mysql.escape ( req.body.is_primary ),
            mysql.escape ( req.body.message_text )

        );

        return _controllerBase.sp_exec ( req, res, next, sp_script );
    }


    function on_restapi_post ( req, res, next )
    {
        if ( req.body.fetch ) return fetch ( req, res, next );

        if ( req.body.patch ) return patch ( req, res, next );

        if ( req.body.write ) return write ( req, res, next );

        return _controllerBase.request_status_send ( res, 400, { error : 'bad request' } );
    }

    return api;

};
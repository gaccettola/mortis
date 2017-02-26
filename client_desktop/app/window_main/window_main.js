
    'use strict';
    
    var controllerId = 'window_main';
    
    angular
        .module ( 'app' )
        .controller ( controllerId, window_main );

    window_main.$inject = [ '$timeout' ];
    
    function window_main ( $timeout )
    {
        var vm = this; // jshint ignore:line

        // ////////////////////////////////////////////////////////////////////
        //
        // variable, node

        const {app} = require('electron').remote;

        // ////////////////////////////////////////////////////////////////////
        //
        // variable, js

        vm.listof_info      = [];

        // ////////////////////////////////////////////////////////////////////
        //
        // declaration

        vm.activate             = activate;

        vm.apppath_info_read    = apppath_info_read;
        vm.apppath_data_write   = apppath_data_write;

        vm.sqlite3_info_read    = sqlite3_info_read;
        vm.sqlite3_data_write   = sqlite3_data_write;

        // ////////////////////////////////////////////////////////////////////
        //
        // implementation

        function activate ( )
        {
            $timeout ( function ( )
            {
                process_info_read  ( );

                apppath_info_read  ( );

                sqlite3_info_read  ( );

                apppath_data_write ( );

                sqlite3_data_write ( );

            }, 0 );
        }

        function listof_info_add ( key, value )
        {
            vm.listof_info.push ( { name : key, info : value } );
        }

        function process_info_read ( )
        {
            listof_info_add ( 'Node',       process.versions.node       );

            listof_info_add ( 'Chrome',     process.versions.chrome     );

            listof_info_add ( 'Electron',   process.versions.electron   );
        }

        function apppath_info_read ( )
        {
            listof_info_add ( 'Home',       app.getPath('home')         );

            listof_info_add ( 'Data',       app.getPath('appData')      );

            listof_info_add ( 'User',       app.getPath('userData')     );

            listof_info_add ( 'Temp',       app.getPath('temp')         );
        }

        function apppath_data_write ( )
        {
            var user_data_directory = app.getPath('userData');

            fsjetpack
                .dir  ( user_data_directory )
                .file ( 'welcome_to_electron.txt',  { content: 'hello' } )
                .file ( 'read_me.json',  { content: 'read all the thing' } );
        }

        function sqlite3_info_read ( )
        {
            if ( null === sqlite3 || undefined === sqlite3 )
            {
                listof_info_add ( 'SQLite',     'Offline'               );

                return;
            }

            listof_info_add ( 'SQLite',     'Online'                    );

            listof_info_add ( 'Version',    sqlite3.VERSION             );

            vm.sqlite3_source_id = sqlite3.SOURCE_ID.split ( ' ' );

            listof_info_add ( 'Date',       vm.sqlite3_source_id[0]     );
            listof_info_add ( 'Time',       vm.sqlite3_source_id[1]     );
            listof_info_add ( 'SHA1',       vm.sqlite3_source_id[2]     );
        }

        function sqlite3_data_write ( )
        {
            if ( null === sqlite3 || undefined === sqlite3 )
            {
                return;
            }

            vm.db = new sqlite3.Database ( ':memory:' );

            vm.db.serialize ( function ( )
            {
                vm.db.run ( 'CREATE TABLE sample (info TEXT)' );

                var stmt = vm.db.prepare ( 'INSERT INTO sample VALUES (?)' );

                for ( var i = 0; i < 10; i++ )
                {
                    stmt.run ( 'test ' + i );
                }

                stmt.finalize ( );

                vm.db.each ( 'SELECT rowid AS id, info FROM sample', function ( err, row )
                {
                    console.log ( row.id + ": " + row.info );

                } );

            } );

            vm.db.close();
        }

        // ////////////////////////////////////////////////////////////////////
        //
        // slots



    }
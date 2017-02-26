
    'use strict';
    
    var controllerId = 'window_main';
    
    angular
        .module ( 'app' )
        .controller ( controllerId, window_main );

    window_main.$inject = [ ];
    
    function window_main ( )
    {
        var vm = this; // jshint ignore:line

        vm.version_node     = process.versions.node;
        vm.version_chrome   = process.versions.chrome;
        vm.version_electron = process.versions.electron;

        vm.sqlite_offline   = ( null === window.sqlite3 || undefined === window.sqlite3 );

        const {app} = require('electron').remote;

        console.log ( 'home    : ' + app.getPath('home') );
        console.log ( 'data    : ' + app.getPath('appData') );
        console.log ( 'user    : ' + app.getPath('userData') );
        console.log ( 'temp    : ' + app.getPath('temp') );
        console.log ( 'sqlite3 : ' + JSON.stringify( window.sqlite3 ) );

        window.fsjetpack
            .dir  ( app.getPath('userData') )
            .file ( 'welcome_to_electron.txt',  { content: 'hello' } )
            .file ( 'read_me.json',  { content: 'read all the thing' } );

        var db = new window.sqlite3.Database ( ':memory:' );

        db.serialize ( function()
        {
            db.run ( 'CREATE TABLE lorem (info TEXT)' );

            var stmt = db.prepare ( 'INSERT INTO lorem VALUES (?)' );

            for ( var i = 0; i < 10; i++ )
            {
                stmt.run( 'Ipsum ' + i );
            }

            stmt.finalize();

            db.each ( 'SELECT rowid AS id, info FROM lorem', function ( err, row )
            {
                console.log ( row.id + ": " + row.info );

            } );

        } );

        db.close();

    }

    'use strict';

    var app = angular.module( 'app',
    [
        'ui.router',
        'ngAnimate',
        'ngSanitize',
        'ngMaterial',
        'ngMessages',
        'templatecache'

    ] );

    app.constant ( '_', window._ );

    app.run( [ '$rootScope', function (  $rootScope )
    {
        $rootScope._ = window._;

    } ] );

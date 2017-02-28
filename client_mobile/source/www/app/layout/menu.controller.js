
( function ( )
{
    'use strict';

     //noinspection JSUnresolvedVariable,JSUnresolvedFunction
     angular
        .module ( 'app.layout' )
        .controller ( 'MenuController', MenuController );

    /* @ngInject */
    function MenuController ( $scope, $ionicModal, $timeout )
    {
        $scope.loginData = { };

        // Create the login modal that we will use later

        $ionicModal.fromTemplateUrl ( 'app/layout/login.html',

            {
                scope : $scope
            }

        ).then (

            function ( modal )
            {
                $scope.modal = modal;
            }
        );

        // Triggered in the login modal to close it
        $scope.closeLogin = function ( )
        {
            $scope.modal.hide ( );
        };

        // Open the login modal
        $scope.login = function ( )
        {
            $scope.modal.show ( );
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function ( )
        {
            console.log ( 'Doing login', $scope.loginData );

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system

            $timeout ( function ()
            {
                $scope.closeLogin();

            }, 1000 );

        };
    }

    MenuController.$inject = [ "$scope", "$ionicModal", "$timeout" ];

} ( ) );
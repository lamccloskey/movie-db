(function () {

    'use-strict';

    angular.module('app.core').config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        

        $stateProvider
            .state('core', {
                abstract: true,
                views: {
                    'main': {
                        templateUrl: 'app/core/main/main.html'
                    },
                    'navbar': {
                        templateUrl: 'app/core/navbar/navbar.html',
                        controller: 'NavbarController',
                        controllerAs: 'vm'
                    }

                }

            });

    }

})();
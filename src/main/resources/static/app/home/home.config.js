(function () {

    'use-strict';

    angular.module('app.home').config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

        $stateProvider
            .state('core.home', {
                url: '/',
                templateUrl: 'app/home/home.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                resolve: {
                    genres: ['movieService', function (movieService) {
                        return movieService.getGenres().then(function (response) {
                            return response.data.genres;
                        });
                    }]
                }
            });
    };

})();

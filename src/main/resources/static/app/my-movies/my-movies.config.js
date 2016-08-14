(function () {

    'use-strict';

    angular.module('app.myMovies').config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

        $stateProvider
            .state('core.my-movies', {
                url: '/',
                templateUrl: 'app/my-movies/my-movies.html',
                controller: 'MyMoviesController',
                controllerAs: 'vm',
                resolve: {
                    myMovies: ['movieService', function (movieService) {
                        return movieService.getAll().then(function (data) {
                            return data;
                        });
                    }]
                }
            });
    };

})();

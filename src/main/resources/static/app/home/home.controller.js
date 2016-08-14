(function () {

    'use-strict';

    angular.module('app.home').controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'movieService', '_', 'genres'];

    function HomeController($scope, movieService, _, genres) {
        var vm = this;
        vm.title = 'movie db';
        vm.search = search;
        vm.add = add;

        function search(movie) {
            if (movie) {
                movieService.search(movie).then(function (data) {
                    console.log(data);
                    angular.forEach(data.results, function (result) {
                        
                        result.poster = result.poster_path ? 'http://image.tmdb.org/t/p/w92' + result.poster_path : 'app/images/noposter.png';
                        result.genres = [];
                        angular.forEach(result.genre_ids, function (genre_id) {
                            _.each(genres, function (genre) {
                                if (_.isMatch(genre, { 'id': genre_id })) {
                                    result.genres.push(genre.name);
                                }
                            });
                        });

                    });

                    vm.results = data.results;
                });
            } else {
                clear();
            }
        }

        function clear() {
            delete vm.results;
            vm.movie = '';
        }

        function add(movie) {
            delete movie.id;
            movieService.add(movie).then(function (data) {
                console.log(data);
            });
        }
    }

})();
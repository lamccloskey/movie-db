(function () {

    'use-strict';

    angular.module('app.home').controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'notifications', 'movieService', '_', 'genres'];

    function HomeController($scope, notifications, movieService, _, genres) {
        var vm = this;
        vm.title = 'movie db';
        vm.search = search;
        vm.add = add;

        const tmdbPosterPath = 'https://image.tmdb.org/t/p/w92';
        const noPosterPath =  'app/images/noposter.png';

        function search(movie) {
            if (movie) {
                movieService.search(movie).then(function (response) {
                    angular.forEach(response.data.results, function (result) {
                        
                        result.poster = result.poster_path ? tmdbPosterPath + result.poster_path : noPosterPath;
                        result.genres = [];
                        angular.forEach(result.genre_ids, function (genre_id) {
                            _.each(genres, function (genre, index) {
                                if (_.isMatch(genre, { 'id': genre_id })) {
                                    result.genres.push(genre.name); //intersectionBy
                                }
                            });
                        });

                    });

                    vm.results = response.data.results;
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
            movieService.add(movie).then(function (response) {
                if(response.status === 400){
                    notifications.showError(movie.title + ' is already added');
                }else{
                    notifications.showSuccess(response.data.title + ' added');
                }
                
            });
        }
    }

})();
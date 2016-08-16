(function () {

    'use-strict';

    angular.module('app.home').controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'notifications', 'movieService', '_', 'genres'];

    function HomeController($scope, notifications, movieService, _, genres) {
        var vm = this;
        vm.title = 'movie db';
        vm.search = search;
        vm.add = add;

        function search(movie) {
            if (movie) {
                movieService.search(movie).then(function (response) {
                    angular.forEach(response.data.results, function (result) {
                        
                        result.poster = result.poster_path ? 'http://image.tmdb.org/t/p/w92' + result.poster_path : 'app/images/noposter.png';
                        result.genres = [];
                        angular.forEach(result.genre_ids, function (genre_id) {
                            _.each(genres, function (genre, index) {
                                if (_.isMatch(genre, { 'id': genre_id })) {
                                    result.genres.push(genre.name);
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
                    notifications.showError(movie.title + ' already added');
                }else{
                    notifications.showSuccess(response.data.title + ' added');
                }
                
            });
        }
    }

})();
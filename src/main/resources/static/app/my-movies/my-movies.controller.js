(function () {

    'use-strict';

    angular.module('app.myMovies').controller('MyMoviesController', MyMoviesController);

    MyMoviesController.$inject = ['$scope', 'notifications', 'movieService', '_', 'myMovies'];

    function MyMoviesController($scope, notifications, movieService, _, myMovies) {
        var vm = this;
        vm.title = 'My Movies';
        vm.myMovies = myMovies;
        vm.remove = remove;


        function remove(id) {
            movieService.remove(id).then(function (data) {
                console.log(data);

                _.each(vm.myMovies, function (movie, index) {
                    if (_.isMatch(movie, { 'id': id })) {
                        vm.myMovies.splice(index, 1);
                        notifications.showSuccess('Movie removed');
                    }
                });

                
            });
        }
    }

})();
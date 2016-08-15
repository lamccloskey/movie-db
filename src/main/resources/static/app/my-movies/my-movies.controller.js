(function () {

    'use-strict';

    angular.module('app.myMovies').controller('MyMoviesController', MyMoviesController);

    MyMoviesController.$inject = ['$scope', 'notifications', 'movieService', '_', 'myMovies'];

    function MyMoviesController($scope, notifications, movieService, _, myMovies) {
        var vm = this;
        vm.title = 'My Movies';
        vm.myMovies = myMovies;
        vm.remove = remove;


        function remove(_id) {
            movieService.remove(_id).then(function (data) {
                console.log(data);

                _.each(vm.myMovies, function (movie, index) {
                    if (_.isMatch(movie, { '_id': _id })) {
                        vm.myMovies.splice(index, 1);
                        notifications.showSuccess('Movie removed');
                    }
                });

                
            });
        }
    }

})();
(function () {

    'use-strict';

    angular.module('app.myMovies').controller('MyMoviesController', MyMoviesController);

    MyMoviesController.$inject = ['$scope', 'movieService', 'myMovies'];

    function MyMoviesController($scope, movieService, myMovies) {
        var vm = this;
        vm.title = 'My Movies';
        vm.myMovies = myMovies;
        vm.remove = remove;


        function remove(id){
            movieService.remove(id).then(function (data) {
                console.log(data);
            });
        }
    }

})();
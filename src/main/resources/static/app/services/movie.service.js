(function () {

    'use-strict';

    angular.module('app.services').factory('movieService', movieService);

    movieService.$inject = ['$http', '$window'];

    function movieService($http, $window) {

        const origin = $window.location.origin;
        const apiKey = '2070102b343bf69650bde4b0063cd085';

        // Implement $Resource for personal db
        var movieService = {
            search: search,
            getGenres: getGenres,
            getAll: getAll,
            get: get,
            add: add,
            remove: remove
        };

        function search(movie) {
            return $http({
                method: 'GET',
                url: 'http://api.themoviedb.org/3/search/movie?query=' + movie + '&api_key=' + apiKey
            }).then(function success(response) {
                return response;
            }, function error(err) {
                return err;
            });
        }

        function getGenres() {
            return $http({
                method: 'GET',
                url: 'http://api.themoviedb.org/3/genre/movie/list' + '?api_key=' + apiKey
            }).then(function success(response) {
                return response;
            }, function error(err) {
                return err;
            });
        }

        function getAll() {
            return $http({
                method: 'GET',
                url: origin + '/api/movies'
            }).then(function success(response) {
                return response;
            }, function error(err) {
                return err;
            });
        }

        function get(id) {
            return $http({
                method: 'GET',
                url: origin + '/api/movies/' + id
            }).then(function success(response) {
                return response;
            }, function error(err) {
                return err;
            });
        }

        function add(movie) {
            return $http({
                method: 'POST',
                data: movie,
                url: origin + '/api/movies'
            }).then(function success(response) {
                return response;
            }, function error(err) {
                return err;
            });
        }

        function remove(id) {
            return $http({
                method: 'DELETE',
                url: origin + '/api/movies/' + id
            }).then(function success(response) {
                return response;
            }, function error(err) {
                return err;
            });
        }

        return movieService;
    }

})();
(function () {

    'use-strict';

    angular.module('app.services').factory('movieService', movieService);

    movieService.$inject = ['$http', '__env'];

    function movieService($http, __env) {

        const origin = __env.siteUrl;
        const tmdbBaseUrl = __env.apiUrl;
        const tmdbApiKey = __env.apiKey;

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
                url: tmdbBaseUrl + '/search/movie?query=' + movie + '&api_key=' + tmdbApiKey
            }).then(function success(response) {
                return response;
            }, function error(err) {
                return err;
            });
        }

        function getGenres() {
            return $http({
                method: 'GET',
                url: tmdbBaseUrl + '/genre/movie/list' + '?api_key=' + tmdbApiKey
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
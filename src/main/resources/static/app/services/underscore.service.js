(function () {

    'use-strict';

    angular.module('app.services').factory('_', _);

    _.$inject = ['$window'];

    function _($window) {

        return $window._;

    }

})();
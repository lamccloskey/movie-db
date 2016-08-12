(function () {

    'use-strict';

    angular.module('app.home').controller('HomeController', HomeController);

    HomeController.$inject = ['$scope'];

    function HomeController($scope) {
        var vm = this;
        vm.title = 'Home';
    }

})();
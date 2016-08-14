(function () {

    'use-strict';

    angular.module('app.core').controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope'];

    function NavbarController($scope) {
        var vm = this;
        vm.brand = 'movie db';
        
    }

})();
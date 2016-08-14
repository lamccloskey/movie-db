(function () {

    'use-strict';

    angular.module('app', [
        'ui.router',
        'ngNotificationsBar',
        'ngSanitize',
        'app.core',
        'app.home',
        'app.myMovies',
        'app.services'
    ])
        .config(config);

    config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'notificationsConfigProvider'];

    function config($stateProvider, $locationProvider, $urlRouterProvider, notificationsConfigProvider) {

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/404');
        $urlRouterProvider.when('/index.html', '/');

        $stateProvider
            .state('core.404', {
                url: '/404',
                templateUrl: 'app/core/error/404.html'
            });

        //ngNotification configuration
        (function () {
            // auto hide
            notificationsConfigProvider.setAutoHide(true);
            // delay before hide
            notificationsConfigProvider.setHideDelay(3000);
            // support HTML
            notificationsConfigProvider.setAcceptHTML(false);
            // Set an animation for hiding the notification
            notificationsConfigProvider.setAutoHideAnimation('fadeOutNotifications');
            // delay between animation and removing the nofitication
            notificationsConfigProvider.setAutoHideAnimationDelay(1200);
        })();

    };

})();

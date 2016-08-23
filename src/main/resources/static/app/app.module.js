(function () {

    'use-strict';

    var __env = {};

    if (window) {
        //Object.assign(__env, window.__env);
        __env = JSON.parse(JSON.stringify(window.__env));
    }

    angular.module('app', [
        'ui.router',
        'ngNotificationsBar',
        'ngSanitize',
        'app.core',
        'app.home',
        'app.myMovies',
        'app.services'
    ])
        .config(config)
        .constant('__env', __env);

    config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'notificationsConfigProvider', '$logProvider'];

    function config($stateProvider, $locationProvider, $urlRouterProvider, notificationsConfigProvider, $logProvider) {

        $logProvider.debugEnabled(__env.enableDebug);
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
            notificationsConfigProvider.setHideDelay(500);
            // support HTML
            notificationsConfigProvider.setAcceptHTML(false);
            // Set an animation for hiding the notification
            notificationsConfigProvider.setAutoHideAnimation('fadeOutNotifications');
            // delay between animation and removing the nofitication
            notificationsConfigProvider.setAutoHideAnimationDelay(1000);
        })();

    };

})();

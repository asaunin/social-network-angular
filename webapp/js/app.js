var app = angular.module('benchmates', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ui.bootstrap.showErrors', 'ngLetterAvatar']);

app.config(['$routeProvider', '$httpProvider', function ($routeProvider) {

    $routeProvider
        .when('/profile', {
            templateUrl: '/partials/profile.html',
            controller: 'profileController'
        })
        .when('/profile/:profileId', {
            templateUrl: '/partials/profile.html',
            controller: 'profileController'
        })
        .when('/users', {
            templateUrl: '/partials/users.html',
            controller: 'usersController'
        })
        .when('/messages', {
            templateUrl: '/partials/messages.html',
            controller: 'messagesController'
        })
        .when('/friends', {
            templateUrl: '/partials/users.html',
            controller: 'usersController'
        })
        .when('/settings', {
            templateUrl: '/partials/settings.html',
            controller: 'settingsController'
        })
        .otherwise(
            {redirectTo: '/profile'}
        );
}]);

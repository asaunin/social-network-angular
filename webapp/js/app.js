var app = angular.module('benchmates', ['ngRoute', 'ngResource', 'ui.bootstrap.showErrors', 'ngLetterAvatar']);

app.directive("profile", function () {
    return {
        restrict: 'E',
        templateUrl: "/partials/profile.html"
    };
}).directive("friends", function () {
    return {
        restrict: 'E',
        templateUrl: "/partials/friends.html"
    };
}).directive("users", function () {
    return {
        restrict: 'E',
        templateUrl: "/partials/users.html"
    };
}).directive("messages", function () {
    return {
        restrict: 'E',
        templateUrl: "/partials/messages.html"
    };
}).directive("conversation", function () {
    return {
        restrict: 'E',
        templateUrl: "/partials/conversation.html"
    };
}).directive("settings", function () {
    return {
        restrict: 'E',
        templateUrl: "/partials/settings.html"
    };
});

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    $routeProvider
        .when('/profile', {
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
            templateUrl: '/partials/friends.html',
            controller: 'friendsController'
        })
        .when('/settings', {
            templateUrl: '/partials/settings.html',
            controller: 'settingsController'
        })
        .otherwise(
            {redirectTo: '/profile'}
        );
}]);

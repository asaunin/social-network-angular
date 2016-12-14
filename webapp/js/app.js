angular.module('benchmates', ['ui.bootstrap.showErrors']).directive("profile", function () {
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

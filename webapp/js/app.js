angular.module('benchmates', ['ui.bootstrap.showErrors']).service('UserService', function () {

    this.getUser = function (data) {
        var prototype = data;
        prototype.getSex = function () {
            switch (prototype.sex) {
                case 1:
                    return 'Male';
                case 2:
                    return 'Female';
                default:
                    return 'Undefined'
            }
        };
        prototype.getName = function () {
            return prototype.first_name + " " + prototype.last_name;
        };
        return prototype;
    }

}).directive("profile", function () {
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

angular.module('benchmates', []).factory('UserService', ['$rootScope', function ($rootScope) {

    // $rootScope.load();

    var user = {
        id: 1,
        first_name: 'Alex',
        last_name: 'Saunin',
        sex: 1,
        email: 'asaunin@mail.ru',
        phone: '+79110940457',
        birth_date: "1984-03-23T00:00:00.000Z",
        reg_date: "2015-01-01T00:00:00.000Z"
    };

    user.getSex = function () {
        switch (user.sex) {
            case 1:
                return 'Male';
            case 2:
                return 'Male';
            default:
                return 'Undefined'
        }
    };

    user.getName = function () {
        return user.first_name
            .concat(" ")
            .concat(user.last_name);
    };

    return {
        setUser: function (u) {
            user = u;
        },
        getUser: function () {
            return user;
        }

    };

}]).directive("profile", function () {
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

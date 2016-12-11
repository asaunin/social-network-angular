var app = angular.module('benchmates', []);

app.controller('tabsCtrl', ['$scope', function ($scope) {
    $scope.tabs = [{
        name: 'profile',
        title: 'Profile'
    }, {
        name: 'friends',
        title: 'Friends'
    }, {
        name: 'users',
        title: 'Users'
    }, {
        name: 'messages',
        title: 'Messages'
    }];

    $scope.currentTab = 'profile';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.name;
    };

    $scope.isActiveTab = function (name) {
        return name == $scope.currentTab;
    };

    // <li<c:if test="${currentTab=='profile' || currentTab=='contact'}"> class="active"</c:if>>
    // <a href="profile?id=${user.id}">Profile</a>
    //     </li>
    //     <li<c:if test="${currentTab=='friends'}"> class="active"</c:if>>
    // <a href="friends">Friends</a>
    //     </li>
    //     <li<c:if test="${currentTab=='users'}"> class="active"</c:if>>
    // <a href="users">Users</a>
    //     </li>
    //     <li<c:if test="${currentTab=='messages' || currentTab=='conversation'}"> class="active"</c:if>>
    // <a href="messages?id=${user.id}">Messages</a>
    //     </li>

}]);

app.directive ("profile", function () {
    return {
        restrict:    'E',
        templateUrl: "profile.html"
    };
});

app.directive ("friends", function () {
    return {
        restrict:    'E',
        templateUrl: "friends.html"
    };
});

app.directive ("users", function () {
    return {
        restrict:    'E',
        templateUrl: "users.html"
    };
});

app.directive ("messages", function () {
    return {
        restrict:    'E',
        templateUrl: "messages.html"
    };
});

app.directive ("conversation", function () {
    return {
        restrict:    'E',
        templateUrl: "conversation.html"
    };
});

app.directive ("contact", function () {
    return {
        restrict:    'E',
        templateUrl: "contact.html"
    };
});

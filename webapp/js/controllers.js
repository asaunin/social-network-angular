var app = angular.module('benchmates');

app.controller('tabController', ['$q', '$scope', '$route', 'UserService', 'MessageService', function ($q, $scope, $route, UserService, MessageService) {

    $scope.userId = 0;
    $scope.profileId = 0;

    var p1, p2, p3;
    p1 = UserService.loadUsers().then(function () {
         p2 = MessageService.loadMessages();
         p3 = UserService.loadFriends();
    });

    $q.all([p1, p2, p3]).then(function (data) {
        $scope.userId = 1;
        $scope.profileId = 1;
        $scope.reloadRoute = function() {
            $route.reload();
        }
    });

    $scope.currentTabName = 'profile';

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

    $scope.onClickTab = function (tabName) {
        $scope.currentTabName = tabName;
    };

    $scope.isActiveTab = function (tabName) {
        if ($scope.currentTabName == 'settings' && tabName == 'profile') {
            return true;
        }
        if ($scope.currentTabName == 'conversation' && tabName == 'messages') {
            return true;
        }
        return $scope.currentTabName == tabName;
    };

}]);

app.controller('profileController', ['UserService', '$http', '$scope', function (UserService, $http, $scope) {

    $http.get('/data/profiles.json').then(function (response) {
        response.data.forEach(function (item) {
            if (item.id == $scope.profileId) {
                $scope.profile = UserService.getUser(item);
            }
        });
    });

}]);

app.controller('settingsController', ['UserService', '$http', '$scope', function (UserService, $http, $scope) {

    $http.get('/data/profiles.json').then(function (response) {
        response.data.forEach(function (item) {
            if (item.id == $scope.profileId) {
                $scope.profile = UserService.getUser(item);
            }
        });
    });

}]);

app.controller('usersController', ['UserService', '$http', '$scope', function (UserService, $http, $scope) {

    $http.get('/data/profiles.json').then(function (response) {
        $scope.userList = UserService.getUsers(response.data);
    });

}]);

app.controller('friendsController', ['UserService', '$http', '$scope', function (UserService, $http, $scope) {

    $http.get('/data/profiles.json').then(function (response) {
        $scope.userList = UserService.getUsers(response.data);
    });

}]);

app.controller('messagesController', ['UserService', 'MessageService', '$http', '$scope', function (UserService, MessageService, $http, $scope) {

    $http.get('/data/messages.json').then(function (mresponse) {
        $http.get('/data/profiles.json').then(function (uresponse) {
            $scope.messageList = MessageService.getMessages(mresponse.data, $scope.userId);
            $scope.messageList.forEach(function (mitem) {
                uresponse.data.forEach(function (uitem) {
                    if (uitem.id == mitem.sender) {
                        mitem.sender = UserService.getUser(uitem);
                    }
                    if (uitem.id == mitem.recipient) {
                        mitem.recipient = UserService.getUser(uitem);
                    }
                });
                if ($scope.userId == mitem.sender.id) {
                    mitem.alignment = 'right';
                    mitem.avatar = mitem.recipient.getName();
                } else {
                    mitem.alignment = 'left';
                    mitem.avatar = mitem.sender.getName();
                }
            });
        });
    });

}]);


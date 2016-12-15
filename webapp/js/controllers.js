//TODO Provide routing
angular.module('benchmates').controller('tabController', function ($scope) {

    $scope.userId = 1;
    $scope.profileId = 1;
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

    $scope.currentTabName = 'profile';

    $scope.onClickTab = function (tabName) {
        $scope.currentTabName = tabName;
    };

    $scope.showTab = function (tabName) {
        return $scope.currentTabName == tabName;
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

}).controller('profileController', function (UserService, $http, $scope) {

    $http.get('/data/profiles.json').then(function (response) {
        response.data.forEach(function (item) {
            if (item.id == $scope.profileId) {
                $scope.profile = UserService.getUser(item);
            }
        });    });

}).controller('settingsController', ['UserService', '$http', '$scope', function (UserService, $http, $scope) {

    // $scope.profileId = $location.search().profileId;
    // getProfile();
    // function getProfile() {
    //     $http.get('/profile/'+ $scope.profileId).then(function (response) {
    //         $scope.profile = response.data;
    //     });
    // }

    // $scope.profileId = 1;

    $http.get('/data/profiles.json').then(function (response) {
        response.data.forEach(function (item) {
            if (item.id == $scope.profileId) {
                $scope.profile = UserService.getUser(item);
            }
        });
    });

}]).controller('usersController', ['UserService', '$http', '$scope', function (UserService, $http, $scope) {

    $http.get('/data/profiles.json').then(function (response) {
        $scope.userList = UserService.getUsers(response.data);
    });

}]).controller('messagesController', ['UserService', 'MessageService', '$http', '$scope', function (UserService, MessageService, $http, $scope) {

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
            });
        });
    });

}]);


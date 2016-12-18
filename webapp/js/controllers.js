var app = angular.module('benchmates');

app.controller('tabController', ['$q', '$scope', '$route', 'UserService', 'MessageService', function ($q, $scope, $route, UserService, MessageService) {

    $scope.accountId = 0;
    $scope.profileId = 0;

    var p1, p2, p3;
    p1 = UserService.loadUsers().then(function () {
        p2 = MessageService.loadMessages();
        p3 = UserService.loadFriends();
    });

    $q.all([p1, p2, p3]).then(function (data) {
        $scope.accountId = 1;
        $scope.account = UserService.getUserById($scope.accountId);
        $scope.profileId = 1;
        $scope.reloadRoute = function () {
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

app.controller('profileController', ['UserService', '$http', '$scope', '$routeParams', function (UserService, $http, $scope, $routeParams) {

    $scope.profile = UserService.getUserById($routeParams.profileId == undefined ? $scope.profileId : $routeParams.profileId);

}]);

app.controller('settingsController', ['UserService', '$http', '$scope', function (UserService, $http, $scope) {

    $scope.editableAccount = Object.assign({}, $scope.account);

    $scope.save = function () {
        $scope.account.update($scope.editableAccount);
    };

    $scope.chooseBirthDate = function() {
        $scope.birthDate.opened = true;
    };

    $scope.birthDate = {
        opened: false
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(),
        minDate: new Date(1900, 1, 1),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

}]);

app.controller('usersController', ['UserService', 'filterFilter', '$http', '$scope', '$route', '$location', function (UserService, filterFilter, $http, $scope, $route, $location) {

    if ($location.$$path == '/users') {
        $scope.userList =  UserService.getUsers();
    } else {
        $scope.userList = UserService.getFriends($scope.accountId);
    }

    // pagination controls
    $scope.currentPage = 1;
    $scope.totalItems = $scope.userList.length;
    $scope.entryLimit = 15; // items per page
    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

    // $watch search to update pagination
    $scope.$watch('userSearch', function (newVal, oldVal) {
        $scope.filtered = filterFilter($scope.userList, newVal);
        $scope.totalItems = $scope.filtered.length;
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
        $scope.currentPage = 1;
    }, true);

}]);

app.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});

app.controller('messagesController', ['UserService', 'MessageService', '$http', '$scope', function (UserService, MessageService, $http, $scope) {

    $scope.messageList = MessageService.getLastMessages($scope.accountId);
    $scope.messageList.forEach(function (mitem) {
        if ($scope.accountId == mitem.sender.id) {
            mitem.alignment = 'right';
            mitem.avatar = mitem.recipient.getName();
        } else {
            mitem.alignment = 'left';
            mitem.avatar = mitem.sender.getName();
        }
    });

}]);


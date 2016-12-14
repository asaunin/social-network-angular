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
        $scope.profile = UserService.getUser(response.data[$scope.profileId]);
    });

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
        $scope.profile = UserService.getUser(response.data[$scope.profileId]);
    });

}]).controller('usersController', ['UserService', '$http', '$scope', function (UserService, $http, $scope) {

    $http.get('/data/profiles.json').then(function (response) {
        $scope.userList = UserService.getUsers(response.data);
    });

}]);


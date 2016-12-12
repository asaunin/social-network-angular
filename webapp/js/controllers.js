//TODO Provide routing
angular.module('benchmates').controller('tabController', function ($scope) {

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

}).controller('profileController', ['$scope', 'UserService', function ($scope, $rootScope, $location) {

    // $scope.profileId = $location.search().profileId;
    // getProfile();
    // function getProfile() {
    //     $http.get('/profile/'+ $scope.profileId).then(function (response) {
    //         $scope.profile = response.data;
    //     });
    // }

    $scope.profile = $rootScope.getUser();

}]).controller('settingsController', ['$scope', 'UserService', function ($scope, $rootScope, $location) {

    // $scope.profileId = $location.search().profileId;
    // getProfile();
    // function getProfile() {
    //     $http.get('/profile/'+ $scope.profileId).then(function (response) {
    //         $scope.profile = response.data;
    //     });
    // }

    $scope.profile = $rootScope.getUser();

    $scope.save = function() {
        if ($scope.userForm.$valid) {
            $rootScope.setUser($scope.profile);
        }
    };

}]);


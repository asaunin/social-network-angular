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
        if ($scope.currentTabName == 'contact' && tabName == 'profile') {
            return true;
        }
        if ($scope.currentTabName == 'conversation' && tabName == 'messages') {
            return true;
        }
        return $scope.currentTabName == tabName;
    };
});


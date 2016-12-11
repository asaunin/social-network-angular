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

})
//TODO Provide routing
.controller('profileController', function ($scope, $location) {

    // $scope.profileId = $location.search().profileId;
    // getProfile();
    // function getProfile() {
    //     $http.get('/profile/'+ $scope.profileId).then(function (response) {
    //         $scope.profile = response.data;
    //     });
    // }

    $scope.profile = {
        id: 1,
        first_name: 'Alex',
        last_name: 'Saunin',
        sex: 1,
        email: 'asaunin@mail.ru',
        phone: '+79110940457',
        birth_date: "1984-03-23T00:00:00.000Z",
        reg_date: "2015-01-01T00:00:00.000Z"
    };

    //ASK How it's better to implement this
    $scope.formatName = function (profile) {
        return profile.first_name
            .concat(" ")
            .concat(profile.last_name);
    };

    $scope.formatSex = function (sex) {
        switch (sex) {
            case 1:
                return 'Male';
            case 2:
                return 'Male';
            default:
                return 'Undefined'
        }
    };

});


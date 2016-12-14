angular.module('benchmates').service('UserService', function () {

    getUser = function (data) {
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
        prototype.isFriend = Math.random() < 0.5; //TODO Implement friendship
        return prototype;
    };
    this.getUser = getUser;
    this.getUsers = function (data) {
        var userList = [];
        data.forEach(function (item, i, data) {
            userList[i] = getUser(item);
        });
        return userList;
    }

});
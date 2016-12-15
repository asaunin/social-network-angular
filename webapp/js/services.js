angular.module('benchmates').service('UserService', ['$http',  function ($http) {

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
        data.forEach(function (item) {
            userList.push(getUser(item));
        });
        return userList;
    }

}]).service('MessageService', ['UserService', function (UserService) {

    this.getMessages = function (data, userId) {
        var messageList = [];
        data.forEach(function (item) {
            if (item.sender = userId || item.recipient == userId)
                var lastMessage = true;
            messageList.forEach(function (message) {
                if (message.date > item.date)
                    lastMessage = false;
            });
            if (lastMessage) {
                messageList.push({
                    "id": item.id,
                    "date": item.date,
                    "sender": item.sender,
                    "recipient": item.recipient,
                    "body": item.body
                });
            }
        });
        return messageList;
    }

}]);
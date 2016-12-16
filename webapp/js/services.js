//TODO Provide data storage to have possibility to update models
angular.module('benchmates').service('UserService', ['$http', function ($http) {

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
            if (item.sender == userId || item.recipient == userId) {
                var lastMessage = null;
                messageList.forEach(function (message) {
                    if (message.sender == item.sender && message.recipient == item.recipient
                        || message.recipient == item.sender && message.sender == item.recipient)
                        lastMessage = message;
                });
                if (lastMessage == null) {
                    messageList.push({
                        "id": item.id,
                        "date": item.date,
                        "sender": item.sender,
                        "recipient": item.recipient,
                        "body": item.body
                    });
                } else {
                    if (item.date > lastMessage.date) {
                        lastMessage.id = item.id;
                        lastMessage.date = item.date;
                        lastMessage.sender = item.sender;
                        lastMessage.recipient = item.recipient;
                        lastMessage.body = item.body;
                    }
                }
            }
        });
        return messageList;
    }

}]);
//TODO Provide data storage to have possibility to update models
var app = angular.module('benchmates');

app.service('UserService', ['$http', function ($http) {

    var users = [];
    var messages = [];

    this.getUserById = function (id) {
        users.foreach(function (user) {
            if (id == user.id) {
                return user;
            }
        });
    };

    this.loadUsers = function () {
        return $http.get('/data/profiles.json').then(function (response) {
            response.data.forEach(function (data) {
                users.push(getUser(data));
            });
        });
    };

    this.loadFriends = function () {
        return $http.get('/data/friends.json').then(function (response) {
            response.data.forEach(function (data) {
                // users.push(getUser(data));
            });
        });
    };

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

    getUserById = function (id) {
        users.forEach(function (user) {
           if (id == user.id) {
               return user;
           }
        });
    };

    this.getUsers = function () {
        return users;
    };

    this.getUser = getUser;
    this.getUserById = getUserById;

}]);

app.service('MessageService', ['UserService', '$http', function (UserService, $http) {

    this.loadMessages = function () {
        return $http.get('/data/messages.json').then(function (response) {
            response.data.forEach(function (data) {
                messages.push(data);
                messages.sender = getUserById(messages.sender);
                messages.recipient = getUserById(messages.recipient);
            });
        });
    };

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
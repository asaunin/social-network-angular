var app = angular.module('benchmates');

app.service('UserService', ['$http', function ($http) {

    var users = [];
    var friends = [];

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
                var user = getUserById(data.userid);
                user.addFriend(data.friendid);
            });
        });
    };

    getUser = function (data) {
        var prototype = data;
        // prototype.birth_date = new Date(data.birth_date);
        prototype.friends = [];
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
        prototype.update = function (user) {
            Object.keys(prototype).forEach(function(key) {
                prototype[key] = user[key];
            });
        };
        prototype.addFriend = function (id) {
            prototype.friends.push(id);
        };
        prototype.removeFriend = function (id) {
            var index = prototype.friends.indexOf(id);
            array.splice(index, 1);
        };
        prototype.hasFriend = function (id) {
            return (prototype.friends.indexOf(id) != -1);
        };
        return prototype;
    };

    getUserById = function (id) {
        var user = {};
        users.forEach(function (item) {
            if (id == item.id) {
                user = item;
            }
        });
        return user;
    };

    this.getUsers = function () {
        return users;
    };

    this.getFriends = function (accountId) {
        var friends = [];
        getUserById(accountId).friends.forEach(function (id) {
            friends.push(getUserById(id));
        });
        return friends;
    };

    this.getUserById = getUserById;

}]);

app.service('MessageService', ['UserService', '$http', function (UserService, $http) {

    var messages = [];

    this.loadMessages = function () {
        return $http.get('/data/messages.json').then(function (response) {
            response.data.forEach(function (data) {
                var message = data;
                message.sender = getUserById(data.sender);
                message.recipient = getUserById(data.recipient);
                messages.push(message);
            });
        });
    };

    this.getLastMessages = function (accountId) {
        var lastMessages = [];
        messages.forEach(function (item) {
            if (item.sender.id == accountId || item.recipient.id == accountId) {
                var lastMessage = null;
                lastMessages.forEach(function (message) {
                    if (message.sender == item.sender && message.recipient == item.recipient
                        || message.recipient == item.sender && message.sender == item.recipient)
                        lastMessage = message;
                });
                if (lastMessage == null) {
                    lastMessages.push({
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
        return lastMessages;
    }

}]);
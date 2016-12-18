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
        prototype.birth_date = new Date(Date.parse(data.birth_date));
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
                message.date = new Date(Date.parse(data.date));
                message.sender = getUserById(data.sender);
                message.recipient = getUserById(data.recipient);
                messages.push(message);
            });
        });
    };

    updateLastMessageAvatar = function (message, accountId) {
        if (accountId == message.sender.id) {
            message.alignment = 'left';
            message.avatar = message.recipient.getName();
            message.interlocutor = message.recipient;
        } else {
            message.alignment = 'right';
            message.avatar = message.sender.getName();
            message.interlocutor = message.sender;
        }
    };

    updateDialogAvatar = function (message, accountId) {
        if (accountId == message.sender.id) {
            message.alignment = 'right';
        } else {
            message.alignment = 'left';
        }
        message.interlocutor = message.sender;
        message.avatar = message.sender.getName();
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
                    var newMessage = {
                        "id": item.id,
                        "date": item.date,
                        "sender": item.sender,
                        "recipient": item.recipient,
                        "body": item.body
                    };
                    updateLastMessageAvatar(newMessage, accountId);
                    lastMessages.push(newMessage);
                } else {
                    if (item.date > lastMessage.date) {
                        lastMessage.id = item.id;
                        lastMessage.date = item.date;
                        lastMessage.sender = item.sender;
                        lastMessage.recipient = item.recipient;
                        lastMessage.body = item.body;
                        updateLastMessageAvatar(lastMessage, accountId);
                    }
                }
            }
        });
        return lastMessages;
    };

    this.getDialogueMessages = function (accountId, interlocutorId) {
        var dialogueMessages = [];
        messages.forEach(function (item) {
            if (item.sender.id == accountId && item.recipient.id == interlocutorId || item.sender.id == interlocutorId && item.recipient.id == accountId) {
                var message = {
                    "id": item.id,
                    "date": item.date,
                    "sender": item.sender,
                    "recipient": item.recipient,
                    "body": item.body
                };
                updateDialogAvatar(message, accountId);
                dialogueMessages.push(message);
            }
        });
        return dialogueMessages;
    };

    this.add = function (senderId, recipientId, text) {
        var message = {
            "id": 666,
            "date": new Date(),
            "sender": getUserById(senderId),
            "recipient": getUserById(recipientId),
            "body": text
        };
        messages.push(message);
        updateDialogAvatar(message, senderId);
        return message;
    }

}]);
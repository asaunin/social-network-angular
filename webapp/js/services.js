var app = angular.module('benchmates');

app.service('UserService', ['$http', function ($http) {

    var users = [];
    var friends = [];

    function getUser(data) {
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
            Object.keys(prototype).forEach(function (key) {
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
    }

    function getUserById(id) {
        var user = {};
        users.forEach(function (item) {
            if (id == item.id) {
                user = item;
            }
        });
        return user;
    }

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

    this.addFriend = function (accountId, friendId) {
        if (accountId != friendId) {
            var user = getUserById(accountId);
            if (!user.friends.includes(friendId)) {
                user.friends.push(friendId);
            }
        }
    };

    this.removeFriend = function (accountId, friendId) {
        if (accountId != friendId) {
            var user = getUserById(accountId);
            if (user.friends.includes(friendId)) {
                user.friends.splice(user.friends.indexOf(friendId), 1);
            }
        }
    };

    this.getUserById = getUserById;

}]);

app.service('MessageService', ['UserService', '$http', '$timeout', function (UserService, $http, $timeout) {

    var messages = [];

    function updateLastMessageAvatar(message, accountId) {
        if (accountId == message.sender.id) {
            message.alignment = 'left';
            message.avatar = message.recipient.getName();
            message.interlocutor = message.recipient;
        } else {
            message.alignment = 'right';
            message.avatar = message.sender.getName();
            message.interlocutor = message.sender;
        }
    }

    function updateDialogAvatar(message, accountId) {
        if (accountId == message.sender.id) {
            message.alignment = 'right';
        } else {
            message.alignment = 'left';
        }
        message.interlocutor = message.sender;
        message.avatar = message.sender.getName();
    }

    this.scrollElement = function (id) {
        $timeout(function () {
            var scroller = document.getElementById(id);
            scroller.scrollTop = scroller.scrollHeight;
        }, 0, false)
    };

    this.loadMessages = function () {
        return $http.get('/data/messages.json').then(function (response) {
            response.data.forEach(function (data) {
                var message = data;
                message.date = new Date(Date.parse(data.date));
                message.sender = UserService.getUserById(data.sender);
                message.recipient = UserService.getUserById(data.recipient);
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

    this.addMessage = function (senderId, recipientId, text) {
        var message = {
            "id": 666,
            "date": new Date(),
            "sender": UserService.getUserById(senderId),
            "recipient": UserService.getUserById(recipientId),
            "body": text
        };
        messages.push(message);
        updateDialogAvatar(message, senderId);
        return message;
    }

}]);
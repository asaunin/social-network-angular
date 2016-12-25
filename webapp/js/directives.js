var app = angular.module('benchmates');

app.directive('buttonSendMessage', function () {
    return {
        restrict: 'E',
        scope: {
            userId: '@'
        },
        template: '<a href="#/messages/{{userId}}" role="button" class="btn btn-secondary btn-sm"><span class="glyphicon glyphicon-envelope"></span>{{user}} Send message</a>',
        replace: true
    };
});
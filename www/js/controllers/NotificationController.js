angular.module('starter.controllers')

.controller('NotificationController',function ($scope,$cordovaLocalNotification, $ionicPlatform,$rootScope) {

  //console.log("NotificationCOntroller called");
  
    $ionicPlatform.ready(function () {




          $scope.scheduleSingleNotification = function () {
            $cordovaLocalNotification.schedule({
              id: 1,
              title: 'Title here',
              text: 'Text here',
              data: {
                customProperty: 'custom value'
              }
            }).then(function (result) {
              // ...
            });
          };
        $scope.scheduleDelayedNotification = function () {
          var now = new Date().getTime();
          var _10SecondsFromNow = new Date(now + 10 * 1000);

          $cordovaLocalNotification.schedule({
            id: 2,
            title: 'Warning',
            text: 'Im so late',
            at: _10SecondsFromNow
          }).then(function (result) {
            //console.log('Notification 2 triggered');
          });
        };

        $scope.scheduleEveryMinuteNotification = function () {
          $cordovaLocalNotification.schedule({
            id: 3,
            title: 'Warning',
            text: 'Dont fall asleep',
            every: 'minute'
          }).then(function (result) {
            //console.log('Notification 3 triggered');
          });
        };

        $scope.updateSingleNotification = function () {
          $cordovaLocalNotification.update({
            id: 2,
            title: 'Warning Update',
            text: 'This is updated text!'
          }).then(function (result) {
            //console.log('Notification 1 Updated');
          });
        };

        $scope.cancelSingleNotification = function () {
          $cordovaLocalNotification.cancel(3).then(function (result) {
            //console.log('Notification 3 Canceled');
          });
        };

    });

})

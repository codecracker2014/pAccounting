angular.module('starter.controllers')

.controller('planningController', function($scope,planningService,$cordovaContacts,notificationService,$ionicSideMenuDelegate) {


/*
$scope.notification=notificationService.loadNotification();
console.log(notificationService.loadNotification());

$scope.$watch(function(){console.log(notificationService.notification);return notificationService.notification;},function(newVal){
  $scope.notification=newVal;
});*/

$scope.toggleLeft = function() {
   $ionicSideMenuDelegate.toggleLeft();
   console.log("Called left");

 };

 $scope.addEvent=function()
 {


 };

})

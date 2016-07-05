angular.module('starter.controllers')

<<<<<<< HEAD
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

=======
.controller('planningController', function($scope,planningService,$ionicActionSheet, $timeout,$ionicSideMenuDelegate) {

   $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
    console.log("Called left");
    
  };
  
  $scope.addEvent=function()
  {
    
  };
  
>>>>>>> 64cfcf48d717ff02916c9f4570b85c864e521c18
})

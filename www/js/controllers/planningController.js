angular.module('starter.controllers')

.controller('planningController', function($scope,planningService,contactsRepo,notificationService,$ionicSideMenuDelegate,simpleTransactionService) {


$scope.domainObject=simpleTransactionService;
$scope.toggleLeft = function() {
   $ionicSideMenuDelegate.toggleLeft();
   console.log("Called left");

 };

 $scope.addEvent=function()
 {


 };

})

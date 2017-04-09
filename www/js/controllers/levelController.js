angular.module('starter.controllers')

.controller('levelController', function($scope,dao,statusService,levelService) {

  //console.log("levelController called");
  
  $scope.currentData=levelService;
//  //console.log("Clist"+$scope.currentList);


})

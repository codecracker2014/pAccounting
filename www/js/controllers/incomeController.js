angular.module('starter.controllers')

.controller('incomeController',function ($scope,dao,statusService,$ionicSlideBoxDelegate,incomeService) {
	// body...
  console.log("HI");
  $scope.level=incomeService.level;
  $scope.showForm="ng-hide";
  $scope.income={};
  $scope.incomeList=incomeService.incomeList;
  incomeService.loadIncome();
  $scope.button_type="button-block";
  $scope.button_show="ng-hide";
  $scope.save=function(income)
  {
    console.log("Save");
    $scope.showForm="ng-hide";
    incomeService.saveIncome(income);
  }
  $scope.update=function(itm)
  {
    $scope.income=itm;
    $scope.button_type="button-small";
    $scope.button_show="";
    $scope.showForm="";
  }
  $scope.openForm=function()
  {
    console.log("Called");
    $scope.button_type="button-block";
    $scope.button_show="ng-hide";
    $scope.showForm="ng-hide";
    $scope.income={};
    $scope.showForm="";
  }
  $scope.delete=function(income)
  {
      incomeService.deleteIncome(income);
      $scope.showForm="ng-hide";
  }

  $scope.cancel=function()
  {
      $scope.showForm="ng-hide";
  }
//Watchers
  $scope.$watch(
    function(){
      return incomeService.incomeList;
    },function(newVal){
        $scope.incomeList=newVal;
    }
  );




});

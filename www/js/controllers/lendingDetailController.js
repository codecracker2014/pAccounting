angular.module('starter.controllers')

.controller('lendingDetailController', function($scope,contactService,contactsRepo,simpleTransactionService,$stateParams) {

  //console.log("lendingDetailController called");
  
$scope.mob = $stateParams.mob;
$scope.billLink=false;
if($scope.mob.search("bills")>=0)
{
$scope.billLink=true;
}
$scope.contact=simpleTransactionService.getTotalByMob($stateParams.mob);
$scope.types=["","Lending","Borrowing","Received","Return"];
$scope.typesSign=["","+","-","-","+"];
$scope.transactions=simpleTransactionService.getAllTrRecords($stateParams.mob);
})

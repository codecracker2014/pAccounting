angular.module('starter.controllers')

.controller('lendingDetailController', function($scope,contactService,contactsRepo,simpleTransactionService,$stateParams) {

$scope.mob = $stateParams.mob;
$scope.contact=simpleTransactionService.getTotalByMob($stateParams.mob);
$scope.types=["","Lending","Borrowing","Received","Return"];
$scope.typesSign=["","+","-","-","+"];
$scope.transactions=simpleTransactionService.getAllTrRecords($stateParams.mob);
})

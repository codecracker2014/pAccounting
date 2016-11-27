angular.module('starter.controllers')

.controller('simpleLendingController', function($scope,contactService,contactsRepo,simpleTransactionService) {
$scope.contacts=contactsRepo.contacts;
$scope.dummySimpleTr={contact:null,amount:0,desc:'',type:''};

$scope.saveSimpleTr=function()
{
    var data={};
    data.amount=$scope.dummySimpleTr.amount;
    data.desc=$scope.dummySimpleTr.desc;
    data.type=$scope.dummySimpleTr.type;
    var contact=JSON.parse($scope.dummySimpleTr.contact);
    data.mob=contact.mob;
    data.name=contact.name;
    console.log($scope.dummySimpleTr);
    console.log($scope.dummySimpleTr.contact);
    console.log(data.mob);

     simpleTransactionService.saveTransaction(data);
     simpleTransactionService.loadSimpleTrView();
     alert('Saved');
}

})

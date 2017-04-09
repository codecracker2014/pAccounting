angular.module('starter.controllers')

.controller('userList', function($scope,contactsRepo) {

  //console.log("userList called");
  
    $scope.addContactFlag="ng-hide";
    $scope.contact={"name":"","mob":""};
    $scope.contacts=contactsRepo.contacts;
    $scope.phoneContacts=contactsRepo;
    var editIndex=null;
    $scope.actn="Add";

    $scope.showAddContact=function()
    {
        $scope.addContactFlag="";
    }
    $scope.refreshContacts = function() {
        contactsRepo.loadContacts();
    };
})

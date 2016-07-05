angular.module('starter.controllers')

.controller('userList', function($scope,contactService) {

    $scope.addContactFlag="ng-hide";
    $scope.contact={"name":"","mob":""};
    $scope.contacts=contactService.contacts;

    var editIndex=null;
    $scope.actn="Add";
    $scope.showAddContact=function()
    {
        $scope.addContactFlag="";
    }
    $scope.addContact=function()
    {
        if($scope.contacts==null)
          $scope.contacts=[];
        if($scope.actn=="Add")
        $scope.contacts.push($scope.contact);
        else if($scope.actn=="Update")
        {
            $scope.contacts[editIndex]=$scope.contact;
            $scope.contact={"name":"","mob":""};
            $scope.actn="Add";
        }
        contactService.saveContacts($scope.contacts);
        $scope.addContactFlag="ng-hide";
        $scope.contact={"name":"","mob":""};
        console.log("saved");
    }
    $scope.edit=function(contact,index)
    {
      $scope.contact=contact;
      editIndex=index;
      $scope.actn="Update";
      $scope.addContactFlag="";
    }
    $scope.delete=function(index)
    {
      $scope.contacts.splice(index,1);
      contactService.saveContacts($scope.contacts);
      console.log(index);
    }

})

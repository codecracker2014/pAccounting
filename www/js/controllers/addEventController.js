angular.module('starter.controllers')

.controller('addEventController', function($scope,$ionicPopup,contactService,trEventService) {

console.log("Called");
$scope.teEvent={"name":"","place":"","date":"",
"transactions": [
            {
                "id": "",
                "type": "simpel",
                "payers": [
                    {
                        "mob": "",
                        "name": "",
                        "amount": 0
                    }
                ],
                "borrowers": [
                    {
                        "mob": "",
                        "name": "",
                        "amount": 0
                    }
                ]
            }
        ]};
$scope.Newtr={"id": "",
"type": "simpel",
"payers": [],"borrowers": []};
$scope.nPayerAmount=5;
$scope.selectPayers=function(name)
{
	$scope.list=[];
  console.log("name"+name);
	$scope.list=contactService.contacts;
	console.log($scope.list);
	$scope.listData={};
  $scope.listData.amount=0;
	//$scope.listData.name=name;
	var myPopup = $ionicPopup.show({
    template: "<div class='list'> <div class='input-label'> Contacts </div><label class='item item-input'>\
		<input type='text' ng-model='key' placeholder='Search'></label><label class='item  item-select'><select ng-model='listData.selected'><option ng-repeat='itm in list | filter:key track by $index' value={{itm}}>{{itm.name}},{{itm.mob}}</option></select></label><label class='item item-input'><input type='number' ng-model='listData.amount' placeholder='Amount'> </label></div>",
    title: 'Select payer',
    subTitle: '',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Add</b>',
        type: 'button-positive',
        onTap: function(e) {
          if ($scope.listData.selected==null) {
//						console.log("me"+$scope.catAdd.name);
			      //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            console.log("Called"+$scope.listData.selected);
            console.log("pa "+$scope.listData.amount);
            payer=JSON.parse($scope.listData.selected);
            payer["amount"]=$scope.listData.amount;
            $scope.Newtr.payers.push(payer);

		        return $scope.listData.selected;
          }
        }
      }
    ]
  });
}

$scope.selectPartners=function(name)
{
	$scope.list=[];
  console.log("name"+name);
	$scope.list=contactService.contacts;
	console.log($scope.list);
	$scope.listData={};
	//$scope.listData.name=name;
  $scope.listData.amount=0;
	var myPopup = $ionicPopup.show({
    template: "<div class='list'> <div class='input-label'> Contacts </div><label class='item item-input'>\
		<input type='text' ng-model='key' placeholder='Search'></label><label class='item  item-select'><select ng-model='listData.selected'><option ng-repeat='itm in list | filter:key track by $index' value={{itm}}>{{itm.name}},{{itm.mob}}</option></select> </label><label class='item item-input'><input type='number' ng-model='listData.amount' placeholder='Amount'> </label></div>",
    title: 'Select payer',
    subTitle: '',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Add</b>',
        type: 'button-positive',
        onTap: function(e) {
          if ($scope.listData.selected==null) {
//						console.log("me"+$scope.catAdd.name);
			      //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            console.log("Called"+$scope.listData.selected);
            console.log("pa "+$scope.listData.amount);
            partner=JSON.parse($scope.listData.selected);
            partner["amount"]=$scope.listData.amount;
            $scope.Newtr.borrowers.push(partner);

		        return $scope.listData.selected;
          }
        }
      }
    ]
  });
}




})

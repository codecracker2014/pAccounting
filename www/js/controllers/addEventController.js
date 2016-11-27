angular.module('starter.controllers')

.controller('addEventController', function($scope,$ionicPopup,contactService,trEventService,$cordovaSQLite,$cordovaContacts,eventsRepo,contactsRepo,$timeout) {


$scope.payersAmountVo={totalAmount:0,sumStrategy:true,partition:0,defaultTotal:false};
$scope.phoneContacts=contactsRepo;
$scope.choice={"payer":true,"partner":true};
$scope.uType={"payer":true,"partner":false};
$scope.defaultTotalAmount=0;
$scope.totalPartnerAmount=0;
$scope.payersList=[];
$scope.partnersList=[];
$scope.nPayerAmount=5;
$scope.showError=false;
$scope.user=JSON.parse(localStorage.getItem("user"));
var timeoutVal=2000;
$scope.bill={desc:'',place:'',date:'',payers:[],partners:[],totalAmount:0};
$scope.selectPayers=function()
{
  if($scope.payersAmountVo.totalAmount!=0&&$scope.payersAmountVo.defaultTotal==false)
  {
    $scope.payersAmountVo.defaultTotal=true;
    console.log("New STrategy"+$scope.payersAmountVo.sumStrategy);
  }
  $scope.list=[];
	$scope.list=contactService.contacts;
	$scope.listData={};
  $scope.listData.payerAmount;
  $scope.listData.partnerAmount;
  $scope.listData.type=["Payer","Partner"];
	//$scope.listData.name=name;
	var myPopup = $ionicPopup.show({
    template: "<div class='list'> \
    <div class='input-label'> Contacts </div>\
    <label class=''>\
    <ion-checkbox ng-model='uType.payer'>Is Payer?</ion-checkbox>\
  <ion-checkbox ng-model='uType.partner'>Is Partner?</ion-checkbox>\
    <label class='item item-input'>\
		<input type='text' ng-model='key' placeholder='Search'></label>\
    <label class='item  item-select'>\
    Contact<select ng-model='listData.selected'><option value={{user}}>Me, {{user.mob}}</option><option  ng-repeat='itm in phoneContacts.contacts | filter:key track by $index' value={{itm}}>{{itm.name}},{{itm.mob}}</option>\
    </select></label>\
    <label class='item item-input {{choice.payer==true&&uType.payer==true||uType.payer==false?&quot;ng-hide&quot;:&quot;&quot;}}'>\
    <input type='number' ng-model='listData.payerAmount' placeholder='Amount paid'> </label>\
    <label class='item item-input {{choice.partner==true&&uType.partner==true||uType.partner==false?&quot;ng-hide&quot;:&quot;&quot;}}'>\
    <input type='number' ng-model='listData.partnerAmount' placeholder='Amount to be paid'></label>\
    <label class='alert-danger {{selectError.flag==false?&quot;ng-hide&quot;:&quot;&quot;}}'>{{selectError.message}}\
    </label>\
    </div>",
    title: 'Select payer',
    subTitle: '',
    scope: $scope,
    buttons: [
      { text: 'Cancel',
      onTap: function(e) {
        if($scope.selectError!=null)
        $scope.selectError.flag=false;
      }
     },
      {
        text: '<b>Add</b>',
        type: 'button-positive',
        onTap: function(e) {
          if ($scope.listData.selected==null||($scope.uType.payer||$scope.uType.partner)!=true) {
            $scope.selectError={};
            $scope.selectError.flag=true;
            $scope.selectError.message="Enter complete data";
            e.preventDefault();
          } else {
            if($scope.selectError!=null)
            $scope.selectError.flag=false;
            var selected=JSON.parse($scope.listData.selected);
            var selectedPartner=JSON.parse(JSON.stringify(selected));
            console.log("Selected "+selected.mob);
            if($scope.uType.payer==true)
            {
              if($scope.choice.payer==true)
              {
                console.log("adding payer");
                  var newAmount=$scope.bill.totalAmount/($scope.payersList.length+1);
                  selected.amount=0;
                  $scope.payersList.push(selected);
                  console.log("newAmount"+newAmount);
                  for(var i=0;i<$scope.payersList.length;i++)
                  {
                    $scope.payersList[i]["amount"]=newAmount;
                  }
              }
              else {
                    selected["amount"]=$scope.listData.payerAmount;
                    $scope.bill.totalAmount=$scope.bill.totalAmount+selected.amount;
                    $scope.payersList.push(selected);
              }

            }
            if($scope.uType.partner==true)
            {
              console.log("adding partner");

              if($scope.choice.partner==true)
              {
                  var newAmount=$scope.bill.totalAmount/($scope.partnersList.length+1);
                  selectedPartner.amount=0;
                  $scope.partnersList.push(selectedPartner);
                  for(var i=0;i<$scope.partnersList.length;i++)
                  {
                    $scope.partnersList[i]["amount"]=newAmount;
                  }
              }
              else {
                    selectedPartner["amount"]=$scope.listData.partnerAmount;
                    $scope.partnersList.push(selectedPartner);
              }


            }
            return $scope.listData.selected;
          }
        }
      }
    ]
  });
}


$scope.addPayment=function(payment)
{
  var totalPartnerAmount=0;
  if($scope.payersList.length==0)
  {
    $scope.errorMessage="Add some payers";
    $scope.showError=true;
    $timeout(hideErrorMessage,timeoutVal);
    return;

  }
  if($scope.partnersList.length==0)
  {
      $scope.errorMessage="Add some partners";
      $scope.showError=true;
      $timeout(hideErrorMessage,timeoutVal);
      return;
  }
  for(var i=0;i<$scope.partnersList.length;i++)
  {
    totalPartnerAmount=totalPartnerAmount+$scope.partnersList[i].amount;
  }
  if(totalPartnerAmount!=$scope.bill.totalAmount)
  {
    $scope.errorMessage="Payers and Partners total not equal";
    $scope.showError=true;
    $timeout(hideErrorMessage,timeoutVal);
    return;
  }

  $scope.bill.payers=$scope.payersList;
  $scope.bill.partners=$scope.partnersList;

  trEventService.saveBill($scope.bill);


};

var hideErrorMessage=function()
{
  $scope.showError=false;
}

$scope.getTotalAmount=function  (itemList)
{

   console.log("..");
   var x=0;
   var flag=false;
   for(var i=0;i<itemList.length;i++)
   {
     x=x+itemList[i].amount;
   }
   $scope.bill.totalAmount=x;
   if($scope.choice.partner==true)
   {
     var newAmount=x/($scope.partnersList.length);
     for(var i=0;i<$scope.partnersList.length;i++)
     {
       $scope.partnersList[i]["amount"]=newAmount;
     }
   }
}

})

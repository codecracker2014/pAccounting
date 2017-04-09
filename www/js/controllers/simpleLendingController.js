angular.module('starter.controllers')

.controller('simpleLendingController', function($scope,contactService,contactsRepo,simpleTransactionService,$stateParams,$ionicHistory) {
  //console.log("simpleLendingController called");


  $scope.$on("$ionicView.enter", function () {
     $ionicHistory.clearHistory();
  });
$scope.contacts=contactsRepo.contacts;
$scope.dummySimpleTr={contact:null,amount:0,desc:'',type:''};
$scope.dummySimpleTr.typeArr=[{name:"Lending",value:"1"},{name:"Borrowing",value:"2"},{name:"Money Back",value:"3"},{name:"Pay Back",value:"4"}];
if($stateParams!=null && $stateParams.data !=null)
{

  var dt=$stateParams.data;
  $scope.dummySimpleTr={contact:{mob:dt.mob,name:dt.name},amount:dt.amount,desc:dt.desc,type:dt.type};
  $scope.dummySimpleTr.typeArr=[{name:"Lending",value:"1"},{name:"Borrowing",value:"2"},{name:"Money Back",value:"3"},{name:"Pay Back",value:"4"}];
  $scope.contacts=[];
  var conts={name:dt.name,mob:dt.mob};
  $scope.dummySimpleTr.isNotf=true;
  $scope.contacts.push(conts);
}
$scope.defaultMob=null;

$scope.currentDate4 = simpleTransactionService.formDate;
$scope.onezoneDatepicker4 = {
		date: $scope.currentDate4,
		mondayFirst: false,
		disablePastDays: false,
		disableSwipe: false,
		disableWeekend: false,
		showDatepicker: false,
		showTodayButton: true,
		calendarMode: false,
		hideCancelButton: false,
		hideSetButton: false,

		callback: function(val){

			//console.log("callback"+val);
			simpleTransactionService.formDate=val;
			$ionicSlideBoxDelegate.update();
			//console.log("Updated");

		}
};

$scope.saveSimpleTr=function()
{
    var data={};
    data.amount=$scope.dummySimpleTr.amount;
    data.desc=$scope.dummySimpleTr.desc;
    data.type=$scope.dummySimpleTr.type;
    var contact={};
    if($scope.dummySimpleTr.contact!=null && $scope.dummySimpleTr.contact.mob==null)
    {
      contact=JSON.parse($scope.dummySimpleTr.contact);

    }
    else {
      contact=$scope.dummySimpleTr.contact;
    }
    data.mob=contact.mob;
    data.name=contact.name;
    if($scope.dummySimpleTr.isNotf!=null && $scope.dummySimpleTr.isNotf==true)
    {
      data.isNotf=true;
    }

     simpleTransactionService.saveTransaction(data);
     simpleTransactionService.loadSimpleTrView();
     alert('Saved');
}

})

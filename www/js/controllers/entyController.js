angular.module('starter.controllers')

.controller('activeTodoController', function($scope,dao,statusService,levelService,incomeService,$ionicSideMenuDelegate) {
  //dao.getExpToday();
	console.log("Controller Init");
	$scope.todos=dao;//.getExpToday();//[{did:true,name:'travel',desc:'went to office',amount:20},{did:false,name:'lunch',desc:'office lunch',amount:40}];
  $scope.todos.date=new Date();
  $scope.todos.getM=getMonthName($scope.todos.date.getMonth());
	$scope.showList="";
	dao.loadSaved();
	$scope.showListE=dao.showList;
	$scope.eNumber=dao.eNumber;
	$scope.iNumber=dao.iNumber;
	incomeService.loadIncomeToday();
	$scope.incomeList=incomeService.todayIncome;
  $scope.inputType={'type':"Expense"};//1==expense && 0= input
	console.log(dao.savedExpense);
	console.log("Height"+window.innerHeight+",width:"+window.innerWidth);
	//console.log("saved:"+$scope.saved);

  $scope.saveTodos=function()
	{

     console.log("hh");
     console.log($scope.addN);
     for(var i=0;i<$scope.addN.length;i++)
     {
       console.log($scope.addN[i]);
          $scope.todos.today.push($scope.addN[i]);
     }
      //$scope.todos.concat($scope.addN);

    console.log("Los");
/*    console.log($scope.todos.today);
		var arr=[];
		for(var i=0;i<$scope.todos.today.length;i++)
		{
				if($scope.todos.today[i].did=="true")
				arr.push($scope.todos.today[i]);
		}
		console.log(arr);*/
		dao.save($scope.todos.today);
		statusService.refresh();
		//levelService.refresh();
    console.log("no");
  //  $scope.addN=[];

	}
	$scope.saveThis=function(itm)
	{

				console.log("Kalled");
					dao.saveThis(itm);
					statusService.refresh();
	}
//MOdel
	 $scope.addNew=function()
 	{
		//$scope.openModal();showList
		$scope.showList="ng-hide";
		console.log("i was callred");
     dao.addN={did:true,name:'',desc:'',amount:0};
}
	$scope.saveThisNew=function(itm)
	{
		if($scope.inputType.type=="Expense")
		{
			dao.saveThis(itm);
			$scope.addN=[];
			$scope.showList="";
			statusService.refresh();
		}
		else if($scope.inputType.type=="Income")
		{
			$scope.saveTodayIncome(itm);

		}
	}
	$scope.cancelThisNew=function()
	{
		 $scope.showList="";
		 dao.addN=null;
	}
	$scope.todos.getData=function()
	{
		dao.getData();
	}
	$scope.contact = {
	 name: 'Mittens Cat',
	 info: 'Tap anywhere on the card to open the modal'
 }

 //Income
 $scope.saveTodayIncome=function(income)
 {
	 console.log("saveTodayIncome");
	 incomeService.saveTodayIncome(income);
	 statusService.refresh();
 }

$scope.update=function(itm,type)
{
	console.log("Updating");
	$scope.inputType.type=type;
	dao.addN=itm;
}
$scope.delete=function(itm,type,index)
{
	if(type=="Expense")
	{
			dao.savedExpense.splice(index,1);
			dao.save(dao.savedExpense);
			statusService.refresh();

	}
	else {
		dao.savedIncome.splice(index,1);
		dao.save(dao.savedIncome,"i");
		statusService.refresh();

	}

}


//Watchers
$scope.$watch(function(){
	return dao.eNumber;
},
function(newVal){
	$scope.eNumber=newVal;
});
$scope.$watch(function(){
	return dao.iNumber;
},
function(newVal){
	$scope.iNumber=newVal;
});

$scope.$watch(function(){
	return incomeService.todayIncome;
},
function(newVal){
	$scope.incomeList=newVal;
});
$scope.$watch(function(){
	return dao.showList;
},
function(newVal){
	$scope.showListE=newVal;
});

console.log("Controller End");
$scope.toggleLeft = function() {
	 $ionicSideMenuDelegate.toggleLeft();
	 console.log("called12");
};
})
.filter('sumOfValue', function () {
 return function (data, key) {
		 if (angular.isUndefined(data) && angular.isUndefined(key))
				 return 0;
		 var sum = 0;
		 angular.forEach(data,function(value){
				 sum = sum + parseInt(value[key]);
		 });
		 return sum;
 }
})

angular.module('starter.controllers')

<<<<<<< HEAD
.controller('activeTodoController', function($scope,dao,statusService,levelService,incomeService,$ionicSideMenuDelegate) {
  //dao.getExpToday();
	console.log("Controller Init");
=======
.controller('activeTodoController', function($scope,dao,statusService,levelService) {
  //dao.getExpToday();
>>>>>>> 64cfcf48d717ff02916c9f4570b85c864e521c18
	$scope.todos=dao;//.getExpToday();//[{did:true,name:'travel',desc:'went to office',amount:20},{did:false,name:'lunch',desc:'office lunch',amount:40}];
  $scope.todos.date=new Date();
  $scope.todos.getM=getMonthName($scope.todos.date.getMonth());
  $scope.addN=[];
	$scope.showList="";
	dao.loadSaved();
<<<<<<< HEAD
	$scope.showListE=dao.showList;
	$scope.eNumber=dao.eNumber;
	$scope.iNumber=dao.iNumber;
	incomeService.loadIncomeToday();
	$scope.incomeList=incomeService.todayIncome;

	console.log(dao.saved);
	console.log("Height"+window.innerHeight+",width:"+window.innerWidth);
	//console.log("saved:"+$scope.saved);

=======
	console.log(dao.saved);
	console.log("Height"+window.innerHeight+",width:"+window.innerWidth);
	//console.log("saved:"+$scope.saved);
>>>>>>> 64cfcf48d717ff02916c9f4570b85c864e521c18
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

<<<<<<< HEAD
				console.log("Kalled");
=======
>>>>>>> 64cfcf48d717ff02916c9f4570b85c864e521c18
					dao.saveThis(itm);
					statusService.refresh();
	}
//MOdel
	 $scope.addNew=function()
 	{
		//$scope.openModal();showList
		$scope.showList="ng-hide";
		console.log("i was callred");
     var tmp={did:true,name:'',desc:'',amount:0};
     $scope.addN.push(tmp);

 	}
	$scope.saveThisNew=function(itm)
	{

		dao.saveThis(itm);
		$scope.addN=[];
		$scope.showList="";
		statusService.refresh();
	}
<<<<<<< HEAD
	$scope.cancelThisNew=function()
	{
		 $scope.showList="";
		 $scope.addN=[];
	}
=======
>>>>>>> 64cfcf48d717ff02916c9f4570b85c864e521c18
	$scope.todos.getData=function()
	{
		dao.getData();
	}
	$scope.contact = {
	 name: 'Mittens Cat',
	 info: 'Tap anywhere on the card to open the modal'
 }

<<<<<<< HEAD
 //Income
 $scope.saveTodayIncome=function(income)
 {
	 console.log("saveTodayIncome");
	 incomeService.saveTodayIncome(income);
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
=======

>>>>>>> 64cfcf48d717ff02916c9f4570b85c864e521c18
})

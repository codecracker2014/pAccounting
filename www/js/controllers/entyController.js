angular.module('starter.controllers')

.controller('activeTodoController', function($scope,dao,statusService,levelService) {
  //dao.getExpToday();
	$scope.todos=dao;//.getExpToday();//[{did:true,name:'travel',desc:'went to office',amount:20},{did:false,name:'lunch',desc:'office lunch',amount:40}];
  $scope.todos.date=new Date();
  $scope.todos.getM=getMonthName($scope.todos.date.getMonth());
  $scope.addN=[];
	$scope.showList="";
	dao.loadSaved();
	console.log(dao.saved);
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
	$scope.todos.getData=function()
	{
		dao.getData();
	}
	$scope.contact = {
	 name: 'Mittens Cat',
	 info: 'Tap anywhere on the card to open the modal'
 }


})

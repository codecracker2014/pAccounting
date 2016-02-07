angular.module('starter.controllers', [])

.controller('starter',function ($scope,dao,$ionicSlideBoxDelegate) {
	// body...
	//$scope.dt=AppDate.getAppDate();
	$scope.currentDate = dao.date;
	$scope.month=month_name(dao.date.getMonth(),1);
	console.log("month"+$scope.month);
	//$scope.minDate = new Date($scope.currentDate.getYear(), $scope.currentDate.getMonth(), 1);
	//$scope.maxDate = new Date($scope.currentDate.getYear(), $scope.currentDate.getMonth(), 30);
	$scope.datePickerCallback = function (val) {
		if (!val) {
			console.log('Date not selected');
		} else {

		//$ionicSlideBoxDelegate.start();
			AppDate.dt=val;
			dao.date=val;
			dao.refresh();
			console.log(dao.today);
			console.log(AppDate.getAppDate());
			console.log('Selected date is : ', val);
			$scope.month=month_name(dao.date.getMonth(),1);

			$ionicSlideBoxDelegate.update();
			console.log("Updated");
		}
	};

})

.controller('activeTodoController', function($scope,dao,statusService) {
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


.controller('configController', function($scope,dao,$ionicScrollDelegate) {

  //var tmp=[{fr:1,did:true,name:'travel',desc:'',amount:20,date:''},{fr:1,did:true,name:'lunch',desc:'',amount:40,date:''},{fr:30,did:true,name:'home',desc:'For home',amount:15000,date:'01'}];
  //localStorage.setItem("eTemplets",JSON.stringify(tmp));
  console.log("Config called");
	$scope.exp=dao.getEtemplets();
	if($scope.exp==null)
	$scope.exp=[];
	$scope.exp.saveButton="block";
	$scope.exp.saveLabel="Save";
	$scope.delLabel="true";
	$scope.hide="ng-hide";
	$scope.dhide="ng-hide";
	$scope.showForm="ng-hide";
	$scope.action="save"
	$scope.state="n";
	var dummyExp={fr:1,did:true,name:'',desc:'',amount:'',date:''};
  if($scope.exp==null)
  {
    console.log("1");
    $scope.exp=[];

  }
	$scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };
	/*DAte picker controll
	$scope.currentDate = new Date();
	$scope.minDate = new Date($scope.currentDate.getYear(), $scope.currentDate.getMonth(), 1);
	$scope.maxDate = new Date($scope.currentDate.getYear(), $scope.currentDate.getMonth(), 30);
	$scope.datePickerCallback = function (val) {
		if (!val) {
			console.log('Date not selected');
		} else {
			console.log('Selected date is : ', val);ng-disabled="expForm.$invalid"
		}
	};*/
  console.log($scope.exp);
	$scope.inc=[{fr:30,did:true,name:'salary',desc:'Salary income',amount:33835,date:'01'}];
	$scope.en={fr:1,did:true,name:'',desc:'',amount:'',date:''};
  console.log($scope.en);
  //localStorage.removeItem("eTemplets");
	$scope.save=function()
	{
		//var e={fr:$scope.nfr,did:$scope.ndid,name:$scope.nname,desc:$scope.ndesc,amount:$scope.namount,date:$scope.ndate};save()
		if($scope.state=="n")
		{
		$scope.exp.push($scope.en);
    console.log("my en");
    console.log($scope.en);
    //localStorage.removeItem("eTemplets");
    localStorage.setItem("eTemplets",JSON.stringify($scope.exp));
		console.log(JSON.parse(localStorage.getItem("eTemplets")));
		//$scope.en={fr:1,did:true,name:'',desc:'',amount:'',date:''};
    dao.refresh();
    $scope.en={fr:1,did:true,name:'',desc:'',amount:'',date:''};

		}
		else
		{
			console.log("Update");
			var i=0;
			for(i=0;i<$scope.exp.length;i++)
			{
				if($scope.exp[i].name==$scope.en.name)
				{
					console.log("found");
					$scope.exp[i]=$scope.en;
					break;
				}
			}
			localStorage.setItem("eTemplets",JSON.stringify($scope.exp));
			dao.refresh();
	    $scope.en={fr:1,did:true,name:'',desc:'',amount:'',date:''};
			$scope.cancel();
		}
	}
	$scope.update=function(e){
		$scope.en=e;
		$scope.exp.saveButton="calm";
		$scope.exp.saveLabel="Update";
		$scope.delLabel="false";
		$scope.hide="";
		$scope.dhide="";
		$scope.state="u"
		$scope.showForm="";
		$scope.scrollTop();
	}
	$scope.cancel=function()
	{
		$scope.en=dummyExp;
		$scope.exp.saveButton="block";
		$scope.exp.saveLabel="Save";
		$scope.delLabel="false";
		$scope.hide="ng-hide";
		$scope.hide="ng-hide";
		$scope.state="n"
		$scope.showForm="ng-hide";
	}
	$scope.delete=function()
	{
		console.log("Delete en");
		var i=0;
		console.log($scope.en);
		for(i=0;i<$scope.exp.length;i++)
		{
			console.log($scope.exp);
			if($scope.exp[i].name==$scope.en.name)
			{
				console.log("found to delete");
				$scope.exp.splice(i, 1);
				break;
			}
		}
		console.log($scope.exp);
		localStorage.setItem("eTemplets",JSON.stringify($scope.exp));
		dao.refresh();
		$scope.en={fr:1,did:true,name:'',desc:'',amount:'',date:''};
		$scope.cancel();

	}
	//Add Expense
	$scope.showAddE=function()
	{

		$scope.exp.saveButton="calm";
		$scope.exp.saveLabel="Save";
		$scope.hide="";

		$scope.state="n"
		$scope.showForm="";
	}
})



//Status controller
.controller('statusController', function($scope,dao,statusService) {
  $scope.todos=[];
  $scope.todos.date=new Date();
  $scope.todos.getM=getMonthName($scope.todos.date.getMonth());
	statusService.monthlyStatus();
  $scope.mStatus=statusService.mStatus;
  $scope.items=statusService.items;
	$scope.status=statusService;
	$scope.height=statusService.width;
	$scope.width=statusService.height;
  console.log("Status");

});

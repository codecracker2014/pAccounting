angular.module('starter.controllers', [])

.controller('activeTodoController', function($scope,dao) {
  dao.getExpToday();
	$scope.todos=dao.getExpToday();//[{did:true,name:'travel',desc:'went to office',amount:20},{did:false,name:'lunch',desc:'office lunch',amount:40}];
	$scope.todos.date=new Date();
  $scope.todos.getM=getMonthName($scope.todos.date.getMonth());
	$scope.todos.save=function()
	{
		dao.save($scope.todos);


	}
	$scope.todos.getData=function()
	{
		dao.getData();
	}
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})




.controller('configController', function($scope,dao) {

  //var tmp=[{fr:1,did:true,name:'travel',desc:'',amount:20,date:''},{fr:1,did:true,name:'lunch',desc:'',amount:40,date:''},{fr:30,did:true,name:'home',desc:'For home',amount:15000,date:'01'}];
  //localStorage.setItem("eTemplets",JSON.stringify(tmp));
  console.log("Config called");
	$scope.exp=JSON.parse(localStorage.getItem("eTemplets"));
  if($scope.exp==null)
  {
    console.log("1");
    $scope.exp=[];

  }

  console.log($scope.exp);
	$scope.inc=[{fr:30,did:true,name:'salary',desc:'Salary income',amount:33835,date:'01'}];
	$scope.en={fr:1,did:true,name:'',desc:'',amount:'',date:''};
  console.log($scope.en);
  //localStorage.removeItem("eTemplets");
	$scope.save=function()
	{
		//var e={fr:$scope.nfr,did:$scope.ndid,name:$scope.nname,desc:$scope.ndesc,amount:$scope.namount,date:$scope.ndate};
		$scope.exp.push($scope.en);
    console.log("my en");
    console.log($scope.en);
    //localStorage.removeItem("eTemplets");
    localStorage.setItem("eTemplets",JSON.stringify($scope.exp));
		console.log(JSON.parse(localStorage.getItem("eTemplets")));
		//$scope.en={fr:1,did:true,name:'',desc:'',amount:'',date:''};
    $scope.en=[];
	}

})



//Status controller
.controller('statusController', function($scope,dao,statusService) {
  $scope.todos=[];
  $scope.todos.date=new Date();
  $scope.todos.getM=getMonthName($scope.todos.date.getMonth());
  $scope.mStatus=statusService.monthlyStatus();
  $scope.items=statusService.items;
  console.log("Status");

});

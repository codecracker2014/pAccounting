var mainApp = angular.module("mainApp", ['ngRoute']);


mainApp.controller('appController', function($scope,testService,dao) {
	console.log("code 1");

	$scope.fromService = testService.sayHello("World");
    dao.init();

    });
 mainApp.config(['$routeProvider', function($routeProvider) {
			$routeProvider.
            when('/activeTodo', {
               templateUrl: 'activeTodo.htm',
               controller: 'activeTodoController'
            }).

            when('/config', {
               templateUrl: 'config.htm',
               controller: 'configController'
            }).

            otherwise({
               redirectTo: '/activeTodo'
            });
         }]);

mainApp.service('testService', function(){
    this.sayHello= function(text){
		console.log("code2");

        return "Service says \"Hello " + text + "\"";
    };
});


mainApp.service('dao', function(){


	this.account={};
	this.keys=['1212'];
	this.init=function()
	{
		this.keys=[];//localStorage.getItem("keys");
		console.log("Init");
	}
	this.keyGen=function()
	{
		var d=new Date();
		var dd=d.getDate();
		var mm=d.getMonth();
		var yy=d.getYear();
		var key=""+dd+""+mm+""+yy;
		return key;
	}
	this.save=function(todos)
	{
		var key=this.keyGen();

		console.log("Key addde"+key);
		var keys=[];
		keys.push(key);
		keys.push('1213');
		localStorage.setItem("keys",JSON.stringify(keys));
		localStorage.setItem(key,JSON.stringify(todos));
	}
	this.getData=function()
	{
		var keys=JSON.parse(localStorage.getItem("keys"));
		var todos=[];
		for(var i=0;i<keys.length;i++)
		{
			todos.push(JSON.parse(localStorage.getItem(keys[i])));


		}
		console.log(todos[0]);
	}


});

mainApp.controller('activeTodoController', function($scope,dao) {


	$scope.todos=[{did:true,name:'travel',desc:'went to office',amount:20},{did:false,name:'lunch',desc:'office lunch',amount:40}];
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


    });




mainApp.controller('configController', function($scope,dao) {

  //var tmp=[{fr:1,did:true,name:'travel',desc:'',amount:20,date:''},{fr:1,did:true,name:'lunch',desc:'',amount:40,date:''},{fr:30,did:true,name:'home',desc:'For home',amount:15000,date:'01'}];
  //localStorage.setItem("eTemplets",JSON.stringify(tmp));
	$scope.exp=JSON.parse(localStorage.getItem("eTemplets"));
  if($scope.exp==null)
  {
    $scope.exp=[];

  }
  console.log($scope.exp);
	$scope.inc=[{fr:30,did:true,name:'salary',desc:'Salary income',amount:33835,date:'01'}];
	$scope.en={fr:1,did:true,name:'',desc:'',amount:'',date:''};
  //localStorage.removeItem("eTemplets");
	$scope.save=function()
	{
		//var e={fr:$scope.nfr,did:$scope.ndid,name:$scope.nname,desc:$scope.ndesc,amount:$scope.namount,date:$scope.ndate};
		$scope.exp.push($scope.en);
    //localStorage.removeItem("eTemplets");
    localStorage.setItem("eTemplets",JSON.stringify($scope.exp));
		console.log(JSON.parse(localStorage.getItem("eTemplets")));
		$scope.en={fr:1,did:true,name:'',desc:'',amount:'',date:''};

	}

    });

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



						when('/status', {
               templateUrl: 'status.htm',
               controller: 'statusController'
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



mainApp.service('statusService', function(){
    console.log("My service");
		this.items=[];
		this.monthlyStatus=function()
		{
			var eTemplets=JSON.parse(localStorage.getItem("eTemplets"));
			var st=[];

			for(var i=0;i<eTemplets.length;i++)
			{
				st[eTemplets[i].name]=0;
				this.items.push(eTemplets[i].name);
			}
			var keys=JSON.parse(localStorage.getItem("keys"));
			for(var i=0;i<keys.length;i++)
			{
				var logs=JSON.parse(localStorage.getItem(keys[i]));
				console.log(logs);
				for(var j=0;j<logs.length;j++)
				{
					console.log("for"+logs[i].name);
					st[logs[j].name]=parseInt(st[logs[j].name])+parseInt(logs[j].amount);
				}
			}
			console.log(st);
			return st;
		}
});


mainApp.service('dao', function(){


	this.account={};
	this.keys=['1212'];
	this.getExpToday=function()
	{
		var today=[];
		console.log("clalled");
		var eTemplets=JSON.parse(localStorage.getItem("eTemplets"));
		var d=new Date();
		var dd=d.getDate();
		var mm=d.getMonth();
		var yy=d.getYear();
		//console.log(eTemplets.length);
		for(var i=0;i<eTemplets.length;i++)
		{
			//console.log("h");
			var expItem=eTemplets[i];
			//console.log(expItem);
			if(expItem["fr"]==1)
			{
				console.log("one");
				today.push(expItem);
			}
			if(expItem["fr"]==30&&expItem["date"]==dd)
			{
				console.log("monthLy");

				today.push(expItem);
			}
			if(expItem["fr"]!=30&&expItem["fr"]!=1&&expItem["fr"]!=0)
			{
				//To be implemented
				console.log("other");

				today.push(expItem);
			}

		}
		return today;
	}
	this.init=function()
	{
		 var keys=[];//localStorage.getItem("keys");
				//localStorage.setItem("keys",JSON.stringify(keys));
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
		var logs=JSON.parse(localStorage.getItem("logs"));
		if(logs==null)
		logs=[];
		console.log("Key addde"+key);

		var dt=new Date();
		var l=todos.length;
		for(var i=0;i<l;i++)
		{
			if(todos[i].did==false)
			{
				todos.splice(i,1);
			}
			else
			todos[i].date=dt;

		}
		//todos["key"]=key;
		//todos["month"]=
		logs.push(todos);
		console.log(todos);

		var keys=JSON.parse(localStorage.getItem("keys"));
		if(keys==null)
		var keys=[];
		if(keys!=null)
		{
			if(keys.indexOf(key)==-1)
				keys.push(key);
			else {
				console.log("already exists");
			}
		}
		else {
			keys.push(key);
		}
		//keys.push('1213');
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
		//$scope.en={fr:1,did:true,name:'',desc:'',amount:'',date:''};

	}

    });






		mainApp.controller('statusController', function($scope,dao,statusService) {
			$scope.todos=[];
			$scope.todos.date=new Date();
			$scope.todos.getM=getMonthName($scope.todos.date.getMonth());
			$scope.mStatus=statusService.monthlyStatus();
			$scope.items=statusService.items;
			console.log("Status");

});

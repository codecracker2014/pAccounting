angular.module('starter.services', [])



.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.service('dao',function(){


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


})


.service('statusService', function(){
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
})

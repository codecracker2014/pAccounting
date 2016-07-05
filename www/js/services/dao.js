angular.module('starter.services')

.service('dao',function($ionicPopup){

  this.today={};
  //Data for stastics
  this.data=[];
  this.showList="ng-hide";
  this.date=new Date();
  this.data.months=["jan"];
  this.saved=[];
  this.level="Level-1";
  this.levels=[];
  this.catList=[];
  this.groups=[];
<<<<<<< HEAD:www/js/services/dao.js
  this.itmList=[];
  this.itmListI=[];
=======
>>>>>>> 64cfcf48d717ff02916c9f4570b85c864e521c18:www/js/services.js
  this.updateLevel=function(index)
  {
      if(index!=null)
      {
        x=index;
        this.level="Level-"+x;

      }
      this.groups=[];
      this.getCatList();
      console.log("level updated"+this.level);
      if(this.cateList!=null)
      {
        for (var i=0; i<this.cateList.length; i++) {
          this.groups[i] = {
            name: this.cateList[i],
            items: []
          };
            items=JSON.parse(localStorage.getItem(this.level+this.groups[i].name));
      /*      console.log("key "+this.level+this.groups[i].name);
            console.log("itms "+this.groups[i].items);
            if(this.groups[i].items=null)
            this.groups[i].items=[];*/
            if(items!=null)
            {
              for (var j=0; j<items.length; j++) {
                  this.groups[i].items.push(items[j]);
                }
            }
        }
      }
      else {
        console.log("hi");
        this.group=[];
      }

  }

<<<<<<< HEAD:www/js/services/dao.js

=======
  this.getExpList=function()
  {
    //console.log("i m");
    if(this.level=="Level-2")
    {
      //console.log("hi");
      var lst=[];
      var etmp=JSON.parse(localStorage.getItem("eTemplets"));
      if(etmp!=null)
      {  for(var i=0;i<etmp.length;i++)
        {
          lst.push(etmp[i].name);
        }
      }
      return lst;
    }
    else {

      var lst=[];
      var t=this.level.charAt(6);
      t--;
      level="Level-"+t;
      console.log(level+"-cat");
      var etmp=JSON.parse(localStorage.getItem(level+"-cat"));
      if(etmp!=null)
      {
          lst=etmp;
      }

      return lst;
    }

    //this.=JSON.parse(localStorage.getItem("levels"));
  }
>>>>>>> 64cfcf48d717ff02916c9f4570b85c864e521c18:www/js/services.js
  this.addNewExp=function(cat,itm)
  {
      list=JSON.parse(localStorage.getItem(this.level+cat));
      if(list==null)
      {
        list=[];
        list.push(itm);
        localStorage.setItem(this.level+cat,angular.toJson(list));

      }
      else {
        list.push(itm);
        localStorage.setItem(this.level+cat,angular.toJson(list));

      }
      this.updateLevel();
  }
  this.getLevels=function()
  {
    this.levels=JSON.parse(localStorage.getItem("levels"));
    if(this.levels==null)
    {
      this.levels=[{text:"Add Level"},{text:"Level-1"}];
      localStorage.setItem("levels",angular.toJson(this.levels));
    }
    return this.levels;
  }
  this.addLevel=function()
  {
    var currentLevel=this.levels.length;
    this.levels.push({text:"Level-"+currentLevel});
    localStorage.setItem("levels",angular.toJson(this.levels));
    console.log(this.levels.length);
  }
  this.addNewCategory=function(name)
  {

    cate=JSON.parse(localStorage.getItem(this.level+"-cat"));
    if(cate!=null)
    {
      if(cate.indexOf(name)!=-1)
      {
        return -1;
      }
      else {
        cate.push(name);
        this.catList=cate;
        localStorage.setItem(this.level+"-cat",angular.toJson(this.catList));
      }
    }
    else {
      cate=[];
      cate.push(name);
      this.catList=cate;
      localStorage.setItem(this.level+"-cat",angular.toJson(this.catList));
    }

    console.log("Called");
  }
  this.getCatList=function()
  {
    console.log("2Called");
    console.log(this.level+"-cat");
    cate=JSON.parse(localStorage.getItem(this.level+"-cat"));
    console.log("cat"+cate);
    if(cate==null)
    {
      this.cateList=[];
      return [];
    }
    else {
      this.cateList=cate;
      return this.cateList;
    }
  }



  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */


  //end level implementation
  this.loadSaved=function()
  {

    var key=getKey(this.date);
    var key2="i"+key;
    this.saved=JSON.parse(localStorage.getItem(key));
    if(this.saved!=null)
    {
      saved=JSON.parse(localStorage.getItem(key2));
      if(saved!=null)
      for(i=0;i<saved.length;i++)
      {
        this.saved.push(saved[i]);
      }
    }

  }
  this.loadData=function(limit)
  {
   //var keys=JSON.parse(localStorage.getItem("keys"));
   var d=new Date();
   var dd=d.getDate();
   var mm=d.getMonth();
   mm=getMonthTwo(mm);
   console.log("m:"+mm);0
   var yy=d.getYear().toString().substr(1,2);
   //console.log(mm+","+yy);
   if(limit=="m")
   {
     for(var i=0;i<this.data.months.length;i++)
     {
       //console.log(yy);
       var m_key=this.data.months[i]+"_"+yy;
       var keys=JSON.parse(localStorage.getItem(m_key));
       console.log(keys);
       if(keys!=null && keys.hasOwnProperty('length'))
       {
         for(var j=0;j<keys.length;j++)
         {
//           console.log(j+":"+keys[j]);
           var k_data=JSON.parse(localStorage.getItem(keys[j]));
           if(k_data!=null)
           this.data.concat(k_data);
           for(var k=0;k<k_data.length;k++)
           {
  //           console.log("k:"+k+":"+k_data[k]);
             this.data.push(k_data[k]);
           }
         }
       }
    //   console.log("l:"+this.data);
     }
   }
  }
  //For list totals
  this.statistics={};
  this.statistics.totals={};
  this.statistics.loadTotals=function()
  {
   var map={};
   for(var i=0;i<this.data.length;i++)
   {
     if(map.hasOwnProperty(this.data[i]['name']))
     {
       var entry={};
     }
     else
     {
       map[this.data[i]['name']]={"name":"","total":"","count":""};
     }
   }
  }
     this.getExpToday=function()
     {
     this.loadData("m");
       var today=[];
       //console.log("clalled");
       var eTemplets=JSON.parse(localStorage.getItem("eTemplets"));
       if(eTemplets==null)
         return [];

         console.log("called");
       var d=this.date;;
       var dd=d.getDate();
       console.log("dd:"+dd);
       var mm=d.getMonth();
       var yy=d.getYear();[{"fr":1,"did":true,"name":"travel","desc":"office","amount":20,"date":"2016-01-24T19:17:55.857Z","$$hashKey":"object:24"},{"did":true,"name":"fg","desc":"gd","amount":2,"$$hashKey":"object:39","date":"2016-01-24T19:17:55.857Z"}]
       //console.log(eTemplets.length);
       for(var i=0;i<eTemplets.length;i++)
       {
         //console.log("h");
         var expItem=eTemplets[i];
         //console.log(expItem);
         if(expItem["fr"]==1)
         {
        //   console.log("one");
           today.push(expItem);
         }
         if(expItem["fr"]==30&&expItem["date"]==dd)
         {
          // console.log("monthLy");

           today.push(expItem);
         }
         if(expItem["fr"]!=30&&expItem["fr"]!=1&&expItem["fr"]!=0)
         {
           //To be implemented
           //console.log("other");

           today.push(expItem);
         }

       }
       if(today!=null)
       {
         this.showList="";
         this.eNumber=today.length;
         console.log("LOadign"+today+"length"+today.length);
      }
       return today;
     }

     this.today=this.getExpToday();
console.log("Loading dao");
   this.account={};
   this.keys=['1212'];
   //this.eTemplets=
   this.getEtemplets=function()
   {
     //console.log("getEtemp");
     return JSON.parse(localStorage.getItem("eTemplets"));
   }
   this.init=function()
   {
      var keys=[];//localStorage.getItem("keys");
   }
   this.refresh=function()
   {
     this.today=this.getExpToday();
     this.loadSaved();
     this.updateLevel();
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
     var key=getKey(this.date);
     var dt=new Date();
     var l=todos.length;
     var tmp=[];
     var oldTodos=JSON.parse(localStorage.getItem(key));
     for(i in todos)
     {
       if(todos[i].did==false)
       {
    //      console.log("false");

       }
       else
       {
          todos[i].date=dt;
          tmp.push(todos[i]);
       }
     }
     var keys=JSON.parse(localStorage.getItem("keys"));
     if(keys==null)
     var keys=[];
     if(keys!=null)
     {
       if(keys.indexOf(key)==-1)
         keys.push(key);
       else {
      //   console.log("already exists");
       }
     }
     else {
       keys.push(key);
     }
     //keys.push('1213');
     localStorage.setItem("keys",JSON.stringify(keys));
     localStorage.setItem(key,JSON.stringify(tmp));
     this.refresh();
   }
   this.saveToDB=function(key,itm)
   {
     var keys=JSON.parse(localStorage.getItem("keys"));
     if(keys==null)
     var keys=[];
     if(keys!=null)
     {
       if(keys.indexOf(key)==-1)
         keys.push(key);
       else {
      //   console.log("already exists");
       }
     }
     else {
       keys.push(key);
     }
     //keys.push('1213');
     localStorage.setItem("keys",JSON.stringify(keys));
     localStorage.setItem(key,JSON.stringify(itm));
    // this.refresh();

   }
   this.getData=function()
   {
     var keys=JSON.parse(localStorage.getItem("keys"));
     var todos=[];
     for(var i=0;i<keys.length;i++)
     {
       todos.push(JSON.parse(localStorage.getItem(keys[i])));


     }
     //console.log(todos[0]);
   }
   this.saveThis=function(itm)
   {
     console.log("I was called");
    var key=getKey(this.date);
     var dt=new Date();
     var tmp=[];
     var oldTodos=JSON.parse(localStorage.getItem(key));
     if(oldTodos==null)
     {
       oldTodos=[];
       oldTodos.push(itm);
       this.saveToDB(key,oldTodos);
       return;
     }
    if(itm.did==true)
     {
        console.log("save");
        var flag=false;
        if(oldTodos!=null)
        for(var i=0;i<oldTodos.length;i++)
        {

          if(itm.name==oldTodos[i].name)
          {
            oldTodos[i]=itm;
            flag=true;
            break;
          }
        }
        if(flag==false)
        {
          oldTodos.push(itm);
        }
        this.saveToDB(key,oldTodos);
     }
     else
     {
       this.showAlert("Save Expense","Please select Expense to save");
       console.log("Delete");
     }
    // this.loadSaved();
   }
   this.deleteThis=function()
   {

   }
   //COde for models


//Service methods
this.showAlert=function(title,message)
{
  var alertPopup = $ionicPopup.alert({
        title: title,
        template: message
     });

     alertPopup.then(function(res) {
        // Custom functionality....
     });
}

})
<<<<<<< HEAD:www/js/services/dao.js
=======


.service('statusService', function(dao){
		this.items=[];
    this.dataPoints=[];
    this.mStatus=[];
    this.total=0;
    this.width="300px";
    this.height="100%";
    this.fr=[];
    this.startDate=new Date();
    this.startDate.setDate(1);
    this.endDate=new Date();

		this.monthlyStatus=function()
		{
			var st=[];

//      console.log("st"+st);
			var keys=JSON.parse(localStorage.getItem("keys"));
      keys=filterKeys(keys,this.startDate,this.endDate);
      this.total=0;
      for(var i=0;i<keys.length;i++)
			{
				var logs=JSON.parse(localStorage.getItem(keys[i]));


				for(var j=0;j<logs.length;j++)
				{
          if(this.items.indexOf(logs[j].name)==-1)
          this.items.push(logs[j].name);

          if(st[logs[j].name]==null)
          {
              st[logs[j].name]=0;
          }
					st[logs[j].name]=parseInt(st[logs[j].name])+parseInt(logs[j].amount);
          this.total=this.total+parseInt(logs[j].amount);
          if(this.fr[logs[j].name]!=null)
              this.fr[logs[j].name]=parseInt(this.fr[logs[j].name])+1;
          else {
            this.fr[logs[j].name]=1;
          }
				}
			}
      for(var i=0;i<this.items.length;i++)
      {
            var obj={};
//            console.log(this.items[i]);
          this.dataPoints.push({y:st[this.items[i]],indexLabel:this.items[i]});
      }
      this.width="300px";
      this.height="100%";
      console.log("points"+this.dataPoints);
      createChart("Expense chart",this.dataPoints);
      this.width="300px";
      this.height="100%";
			this.mStatus= st;

    }
    this.refresh=function()
    {
      console.log("Refreshing");
      this.items=[];
      this.dataPoints=[];
      this.mStatus=[];
      try{
      this.monthlyStatus();
    }catch(err){
      this.items=[];
      this.dataPoints=[];
      this.mStatus=[];

    }
      dao.loadSaved();
      console.log("p:"+this.dataPoints);
    //  createChart("Expense chart",this.dataPoints);
    }
})
>>>>>>> 64cfcf48d717ff02916c9f4570b85c864e521c18:www/js/services.js

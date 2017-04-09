angular.module('starter.services',[])

.service('service',function(dao,statusService){
  //console.log("Service.js");
  
  this.items=[];
  this.exstingItms=[];
  this.getExpList=function()
  {
    ////console.log("i m");
    if(dao.level=="Level-2")
    {
      ////console.log("hi");
      var lst=[];
    //  statusService.monthlyStatus();
      this.getItems();
      return this.items;
    }
    else {

      var lst=[];
      var t=dao.level.charAt(6);
      t--;
      level="Level-"+t;
      //console.log(level+"-cat");
      var etmp=JSON.parse(localStorage.getItem(level+"-cat"));
      if(etmp!=null)
      {
          lst=etmp;
      }

      return lst;
    }

    //this.=JSON.parse(localStorage.getItem("levels"));
  }
  this.getEitms=function(level)
  {
    var etmp=JSON.parse(localStorage.getItem(level+"-cat"));
    //console.log("etmps"+etmp);
    for(i=0;i<etmp.length;i++)
    {
      var lst=JSON.parse(localStorage.getItem(level+etmp[i]));
      //console.log("lst "+lst);
      if(lst!=null)
      {
        for(j=0;j<lst.length;j++)
        {
          if(this.exstingItms.indexOf(lst[j])==-1)
          {
            this.exstingItms.push(lst[j]);
          }
        }
      }
    }
  }
  this.getItems=function()
  {
    this.getEitms(dao.level);
  //      //console.log("st"+st);

  //console.log("Existting"+this.exstingItms);
    var keys=JSON.parse(localStorage.getItem("keys"));

    this.total=0;
    for(var i=0;i<keys.length;i++)
    {
      var logs=JSON.parse(localStorage.getItem(keys[i]));
      for(var j=0;j<logs.length;j++)
      {
        if((this.items.indexOf(logs[j].name)==-1)&&(this.exstingItms.indexOf(logs[j].name)==-1))
        {
            this.items.push(logs[j].name);
        }
      }
    }

  }

})

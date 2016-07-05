angular.module('starter.services')

.service('incomeService',function(dao){

    this.level="Level-2";
    this.incomeList=[];
    this.incomeList.showTable="ng-hide";
    this.todayIncome=[];
    this.todayIncome.show="ng-hide";
    this.refresh=function()
    {
      this.loadIncomeToday();
    }

    this.loadIncome=function()
    {
        iTempletes=JSON.parse(localStorage.getItem("iTempletes"));
        if(iTempletes!=null)
        {
          this.incomeList.showTable="";
          this.incomeList=iTempletes;

        }
        else
        {
          this.incomeList.showTable="ng-hide";
        }
    }
    this.loadIncomeToday=function()
    {
        this.loadIncome();
        dt=dao.date.getDate();
        console.log("Date is"+dt);
        if(this.incomeList!=null)
        {
          tmp=[];
          for(i=0;i<this.incomeList.length;i++)
          {
            if(this.incomeList[i].type=="Monthly" && this.incomeList[i].date==dt)
            {
              tmp.push(this.incomeList[i]);
            }
            else if(this.incomeList[i].type=="Daily")
            {
              tmp.push(this.incomeList[i]);
            }
          }
          this.todayIncome=tmp;
          if(this.todayIncome.length!=0)
          {
            this.todayIncome.show="";
          }
          else {
            this.todayIncome.show="ng-hide";
          }
        }
    }

    this.saveIncome=function(income)
    {
      console.log(income);
      iTempletes=JSON.parse(localStorage.getItem("iTempletes"));
      if(iTempletes==null)
      {
        iTempletes=[];
        iTempletes.push(income);
        localStorage.setItem("iTempletes",angular.toJson(iTempletes));
        console.log("First Saved");
        this.incomeList.showTable="";
      }
      else
      {
        tmp=[];
        flag=false;
        for(var i=0;i<iTempletes.length;i++)
        {

          if(iTempletes[i].name==income.name)
          {
            console.log("Edit");
            flag=true;
            tmp.push(income);
          }
          else
          {
            console.log("Adding to tmp");
            tmp.push(iTempletes[i]);
          }
        }
        if(flag==false)
        {
          tmp.push(income);
        }
        localStorage.setItem("iTempletes",angular.toJson(tmp));
        console.log(" Saved"+tmp.length);

      }
      this.loadIncome();
    }
    this.saveTodayIncome=function(itm)
    {
      console.log("I was called");
      var key="i"+getKey(dao.date);
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
    this.saveToDB=function(key,itm)
    {
      var keys=JSON.parse(localStorage.getItem("ikeys"));
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
      localStorage.setItem("ikeys",JSON.stringify(keys));
      localStorage.setItem(key,JSON.stringify(itm));
     //

    }

    this.deleteIncome=function(income)
    {
      console.log(income);
      iTempletes=JSON.parse(localStorage.getItem("iTempletes"));
      if(iTempletes==null)
      {
        console.log("Can't Delete");
      }
      else
      {
        tmp=[];
        for(var i=0;i<iTempletes.length;i++)
        {

          if(iTempletes[i].name==income.name)
          {
            console.log("Edit");

//            tmp.push(income);
          }
          else
          {
            console.log("Adding to tmp");
            tmp.push(iTempletes[i]);
          }
        }
        localStorage.setItem("iTempletes",angular.toJson(tmp));
        console.log(" Saved"+tmp.length);

      }
      this.loadIncome();

    }


});

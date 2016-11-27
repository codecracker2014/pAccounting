angular.module('starter.services')

.service('simpleTransactionService',function(){

this.formDate=new Date();
this.connections=[];
this.totalR=0;
this.totalP=0;
this.saveTransaction=function(data)
{
      data.date=this.formDate;
      var keyOfDt=getKey(this.formDate);
      var count=JSON.parse(localStorage.getItem("simpleTrTodayCount"));
      if(count==null)
      count=0;
      else {
        count++;
      }
      key="str"+keyOfDt+""+count;
      var contactTransactions=JSON.parse(localStorage.getItem("strCT"+data.mob));
      if(contactTransactions!=null)
      {
        contactTransactions.push(key);
      }
      else {
        contactTransactions=[key];
      }

      var simpleTrByDate=JSON.parse(localStorage.getItem("strDT"+keyOfDt));
      if(simpleTrByDate!=null)
      {
          simpleTrByDate.push(key);
      }
      else
      {
          simpleTrByDate=[key];
      }
      var monthKey="monthlyDT"+this.formDate.getMonth()+""+this.formDate.getFullYear();
      var monthlyStr=JSON.parse(localStorage.getItem(monthKey));
      if(monthlyStr!=null&&monthlyStr.indexOf("strDT"+keyOfDt)==-1)
      {
        monthlyStr.push("strDT"+keyOfDt);

      }
      else {
        monthlyStr=["strDT"+keyOfDt];
      }


      var contactTotals=JSON.parse(localStorage.getItem("ttl"+data.mob));
      if(contactTotals==null)
      {
        contactTotals={};
        contactTotals.total=0
      }
      if(data.type==1||data.type==4)
       contactTotals.total=contactTotals.total+data.amount;
     if(data.type==2||data.type==3)
       contactTotals.total=contactTotals.total-data.amount;

     contactTotals.name=data.name;

     var totalList=JSON.parse(localStorage.getItem("ttlList"));
     if(totalList==null)
     totalList=[];

     if(totalList.indexOf(data.mob)==-1)
     totalList.push(data.mob);

      localStorage.setItem("simpleTrTodayCount",angular.toJson(count));
      localStorage.setItem(key,angular.toJson(data));
      localStorage.setItem("strCT"+data.mob,angular.toJson(contactTransactions));
      localStorage.setItem("strDT"+keyOfDt,angular.toJson(simpleTrByDate));
      localStorage.setItem(monthKey,angular.toJson(monthlyStr));
      localStorage.setItem("ttl"+data.mob,angular.toJson(contactTotals));
      localStorage.setItem("ttlList",angular.toJson(totalList));

}


this.loadSimpleTrView=function()
{
     var totalList=JSON.parse(localStorage.getItem("ttlList"));
     this.totalR=0;
     this.totalP=0;
     this.connections=[];
     if(totalList!=null)
     {
       for(var i=0;i<totalList.length;i++)
       {
           var contactTtl=JSON.parse(localStorage.getItem("ttl"+totalList[i]));
           var contact={};
           contact.name=contactTtl.name;
           contact.mob=totalList[i];
           contact.total=contactTtl.total;
           if(contact.total>0)
           {
             this.totalR=this.totalR+contact.total;
           }
           else {
             this.totalP=this.totalP+contact.total;
           }
           this.connections.push(contact);
       }
     }
     console.log("total "+this.totalR);
}

this.getTotalByMob=function(mob)
{
   return JSON.parse(localStorage.getItem("ttl"+mob));
}

this.getAllTrRecords=function(mob)
{
  var contactTrs=JSON.parse(localStorage.getItem("strCT"+mob));
  var records=[];
  if(contactTrs!=null)
  {
    for(var i=0;i<contactTrs.length;i++)
    {
        var stc=JSON.parse(localStorage.getItem(contactTrs[i]));
        if(stc!=null)
        records.push(stc);
    }
  }
  return records;

}
this.loadSimpleTrView();
})

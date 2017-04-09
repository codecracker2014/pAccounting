angular.module('starter.services')

.service('trEventService',function(eventsRepo,simpleTransactionService,$state){
  //console.log("trEventService.js");
  

this.deleteBill=function(billId)
{
  var bill=JSON.parse(localStorage.getItem(billId));
  var billsKey=this.getBillsKey(new Date(bill.date));
  var billToday=this.getBillToday(billsKey);
  var i=billToday.indexOf(billId);
  if(i>-1)
  {
    billToday.splice(i, 1);
  }
  localStorage.setItem(billsKey,angular.toJson(billToday));
  localStorage.removeItem(billId);
  var keyOfDt=getKey(new Date(bill.date));
  simpleTransactionService.deleteAllForUser(billId,keyOfDt);
  alert("Bill deleted");
  $state.go('tab.planning');
}
this.getBillsKey=function(date)
{
  var keyOfDt=getKey(date);
  var billsKey="bills"+keyOfDt;
    return billsKey;
}
this.getBillToday= function(billsKey)
{
  return JSON.parse(localStorage.getItem(billsKey));
}
this.saveBill=function(bill,billId)
{
  var billKey="";
  bill.date=eventsRepo.formDate;
  if(billId!=null && billId != "")
  {
    billKey=billId;
  }
  else {
    var billsKey=this.getBillsKey(bill.date);
    var billToday=this.getBillToday(billsKey);
    var i=0;
    if(billToday!=null)
    {
      i=billToday.length;
    }
    else {
      billToday=[];
    }
    billKey=billsKey+"i"+i;
    billToday.push(billKey);
    localStorage.setItem(billsKey,angular.toJson(billToday));
  }
  this.saveTrFromBill(bill,billKey);
  localStorage.setItem(billKey,angular.toJson(bill));
  alert("Bill saved");
  simpleTransactionService.loadSimpleTrView();
  $state.go('tab.planning');
}

this.saveTrFromBill=function(bill,billKey)
{
  var user=JSON.parse(localStorage.getItem("user"));
  var payers=bill.payers;
  var partners=bill.partners;
  var foundUser=false;
  var amount=0;
  for(var i=0;i<payers.length;i++)
  {
    if(payers[i].mob==user.mob)
    {
      foundUser=true;
        amount=amount+payers[i].amount;
    }
  }
  for(var i=0;i<partners.length;i++)
  {
    if(partners[i].mob==user.mob)
    {
      foundUser=true;
        amount=amount-partners[i].amount;
    }

  }

  var data={};
  data.type=1;
  if(amount<0)
  {
    data.type=2;
    amount=-amount;
  }
  data.amount=amount;
  data.desc=bill.desc;
  data.name=(bill.desc!=null && bill.desc!=""?bill.desc:"Bill")+(bill.place!=null && bill.place!=""?" bill @ "+bill.place:"");
  data.mob=billKey;
  simpleTransactionService.saveTransaction(data);
}
})

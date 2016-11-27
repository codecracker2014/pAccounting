angular.module('starter.services')

.service('trEventService',function(eventsRepo,simpleTransactionService){


this.saveBill=function(bill)
{
  console.log("Saving bill " +bill.payers[0].mob);
  bill.date=eventsRepo.formDate;
  var keyOfDt=getKey(bill.date);
  var billsKey="bills"+keyOfDt;
  var billToday=JSON.parse(localStorage.getItem(billsKey));
  var i=0;
  if(billToday!=null)
  {
    i=billToday.length;
  }
  else {
    billToday=[];
  }
  var billKey=billsKey+"i"+i;
  this.saveTrFromBill(bill,billKey);
  billToday.push(billKey);
  localStorage.setItem(billKey,angular.toJson(bill));
  localStorage.setItem(billsKey,angular.toJson(billToday));
  console.log("BILL "+keyOfDt);
  //this.saveTrFromBill(bill,billKey);
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
  data.name="bill";
  data.mob=billKey;
  simpleTransactionService.saveTransaction(data);

}
})

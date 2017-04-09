function getMonthName(m)
{

var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var n = month[m];
return n;
}
function getMonthTwo(m)
{

  var month = new Array();
  month[0] = "01";
  month[1] = "02";
  month[2] = "03";
  month[3] = "04";
  month[4] = "05";
  month[5] = "06";
  month[6] = "07";
  month[7] = "08";
  month[8] = "09";
  month[9] = "10";
  month[10] = "11";
  month[11] = "12";
  var n = month[m];
  return n;
}
function month_name(i,mode)
{
  var month_names= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var month_names_short= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if(mode==0)
  {
    //console.log(month_names[i]);
    return month_names[i];
  }
  else if (mode==1) {
    //console.log(month_names[i]);
    return month_names_short[i];
  }

}

function createChart(id,cTitle,data,type) {
//console.log("Creating chart");
var ctx = document.getElementById(id);
 var chart = new Chart(ctx,
 {
   type: type,
   data:data
 });
 setTimeout(3000);
 chart.render();
}


function getKey(d)
{
  //var d=AppDate.getAppDate();
  var dd=d.getDate();
  var mm=d.getMonth();
  mm=getMonthTwo(mm);
  //console.log("m:"+mm);
  var yy=d.getYear().toString().substr(1,2);
  var key=dd+mm+yy;
  //console.log(key);
  return key;
}
//60215 280216
//key1>key2
function keyEquals(key1,key2)
{
//  //console.log("key1:"+key1+" key2:"+key2);
  var y1=parseInt(getYear(key1));
  var m1=parseInt(getM(key1));
  var d1=parseInt(getD(key1));
  var y2=parseInt(getYear(key2));
  var m2=parseInt(getM(key2));
  var d2=parseInt(getD(key2));
  if(y1>y2)
  {
    return true;
  }
  else if(y1<y2)
  {
    return false;
  }
  else {
    if(m1>m2)
    {
      return true;
    }
    else if (m1<m2) {
        return false;
    }
    else {
      if(d1>d2)
      {
        return true;
      }
      else  {
        return false;

      }

    }
  }
}

function getYear(key)
{
  if(key.length==5)
  {
    return key.substr(3,2);
  }
  else {
    return key.substr(4,2);
  }
}
function getM(key)
{
  if(key.length==5)
  {
    return key.substr(1,2);
  }
  else {
    return key.substr(2,2);
  }
}
function getD(key)
{
  if(key.length==5)
  {
    return key.substr(0,1);
  }
  else {
    return key.substr(0,2);
  }
}



function filterKeys(keys,startDate,endDate)
{
  var tmp=[];
  var stKey=getKey(startDate);
  var endKey=getKey(endDate);
//  //console.log("keys:"+keys+"stkey "+stKey);
  flag=false;

  for(i=0;i<keys.length;i++)
  {
  //  //console.log("keys[i]"+keys[i]+"stKey"+stKey);
    if(keys[i].substr(0,1)=="i")
    {
      //console.log("Found I");
      keys[i]=keys[i].substr(1,keys[i].length-1);
      flag=true;
    }
    if((keyEquals(keys[i],stKey)||(keys[i]==stKey))&&(keyEquals(endKey,keys[i])||(keys[i]==endKey)))
    {
      if(flag==true)
      {
        //console.log("Found I");
        keys[i]="i"+keys[i];
      }
      tmp.push(keys[i]);
    }
  }

  //console.log("endKey"+endKey+"Selected:"+tmp);
  return tmp;
}
function generateKeys(startDate,endDate)
{
  var tmp=[];
  var idate=new Date(startDate);
  while (idate<=endDate) {
    var k=getKey(idate);
    tmp.push(k);
    var newDate = idate.setDate(idate.getDate() + 1);
    idate = new Date(newDate);

  }
  return tmp;
  }


/*function month_name(i,mode)
{

       month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
       month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
       if(mode==0)
       {
         return month_names[i];
       }
       else if (mode==1) {
         return month_names_short[i];
       }

}
*/

var AppDate = (function () {
    var dt;

    function createInstance() {
        var object = new Date();
        return object;
    }

    return {
        getAppDate: function () {
            if (!dt) {
                dt = createInstance();
            }
            return dt;
        }
    };
})();


function findContact(contacts,mob)
{
    if(contacts==null)
    return -1;
    for(var i=0;i<contacts.length;i++)
    {
      if(contacts[i].mob==mob)
      return contacts[i];
    }
    return -1;
}
function initDate3ForAddEvent($scope,eventsRepo,$ionicSlideBoxDelegate)
{

  $scope.currentDate3 = eventsRepo.formDate;
  $scope.onezoneDatepicker3 = {
  		date: $scope.currentDate3,
  		mondayFirst: false,
  		disablePastDays: false,
  		disableSwipe: false,
  		disableWeekend: false,
  		showDatepicker: false,
  		showTodayButton: true,
  		calendarMode: false,
  		hideCancelButton: false,
  		hideSetButton: false,

  		callback: function(val){

  			//console.log("callback"+val);
  			eventsRepo.formDate=val;
  			$ionicSlideBoxDelegate.update();
  			//console.log("Updated");

  		}
  };

}
function inifDate5ForStatus($scope,statusService)
{

  $scope.currentDate5 = statusService.startDate;
  $scope.month5=month_name(statusService.startDate.getMonth(),1);
  //console.log("month1"+$scope.month5);

  //console.log("month5 ds "+statusService.startDate);
  $scope.onezoneDatepicker5 = {
  		date: $scope.currentDate5,
  		mondayFirst: false,
  		disablePastDays: false,
  		disableSwipe: false,
  		disableWeekend: false,
  		showDatepicker: false,
  		showTodayButton: true,
  		calendarMode: false,
  		hideCancelButton: false,
  		hideSetButton: false,

  		callback: function(val){
        //console.log("Start ds "+statusService.startDate);
  			statusService.startDate=new Date(val.getFullYear(), val.getMonth() , 1);;

  			//console.log('Selected date is : ', val);
  			$scope.month1=month_name(statusService.startDate.getMonth(),1);
        var lastDay = new Date(val.getFullYear(), val.getMonth() + 1, 0);
  			statusService.endDate=lastDay;
        statusService.refresh();
  			//console.log(lastDay);
  		}
  };

}
function initDate2ForStatus($scope,statusService)
{
  $scope.currentDate2 = statusService.endDate;
  $scope.month2=month_name(statusService.endDate.getMonth(),1);
  //console.log("month2"+$scope.month2);
  //$scope.minDate = new Date($scope.currentDate.getYear(), $scope.currentDate.getMonth(), 1);
  //$scope.maxDate = new Date($scope.currentDate.getYear(), $scope.currentDate.getMonth(), 30);
  $scope.onezoneDatepicker2 = {
  		date: $scope.currentDate2,
  		mondayFirst: false,
  		disablePastDays: false,
  		disableSwipe: false,
  		disableWeekend: false,
  		showDatepicker: false,
  		showTodayButton: true,
  		calendarMode: false,
  		hideCancelButton: false,
  		hideSetButton: false,

  		callback: function(val){

  			statusService.endDate=val;
  			statusService.refresh();

  			//console.log('Selected date is : ', val);
  			$scope.month2=month_name(statusService.endDate.getMonth(),1);

  		}
  };

}
function initDateForStatus($scope,statusService)
{

  	$scope.currentDate1 = statusService.startDate;
  	$scope.month1=month_name(statusService.startDate.getMonth(),1);
  	//console.log("sd "+statusService.startDate);
  	//$scope.minDate = new Date($scope.currentDate.getYear(), $scope.currentDate.getMonth(), 1);
  	//$scope.maxDate = new Date($scope.currentDate.getYear(), $scope.currentDate.getMonth(), 30);

  	$scope.onezoneDatepicker1 = {
  	    date: $scope.currentDate1,
  	    mondayFirst: false,
  	    disablePastDays: false,
  	    disableSwipe: false,
  	    disableWeekend: false,
  	    showDatepicker: false,
  	    showTodayButton: true,
  	    calendarMode: false,
  	    hideCancelButton: false,
  	    hideSetButton: false,

  	    callback: function(val){

  				statusService.startDate=val;
  				statusService.refresh();
  				//console.log('Selected date is : ', val);
  				$scope.month1=month_name(statusService.startDate.getMonth(),1);

  	    }
  	};

}
function initEntryDates(scope,dao,incomeService,ionicSlideBoxDelegate)
{
  scope.currentDate = dao.date;
  scope.month=month_name(dao.date.getMonth(),1);
  scope.level=dao.level;

  //console.log("month"+dao.date);
  scope.onezoneDatepicker = {
      date: scope.currentDate,
      mondayFirst: false,
      disablePastDays: false,
      disableSwipe: false,
      disableWeekend: false,
      showDatepicker: false,
      showTodayButton: true,
      calendarMode: false,
      hideCancelButton: false,
      hideSetButton: false,

      callback: function(val){

        //console.log("callback"+val);
        AppDate.dt=val;
        dao.date=val;
        dao.refresh();
        incomeService.refresh();
        //console.log(dao.today);
        //console.log(AppDate.getAppDate());
        //console.log('Selected date is : ', val);
        scope.month=month_name(dao.date.getMonth(),1);

        ionicSlideBoxDelegate.update();
        //console.log("Updated");

      }
  };

}

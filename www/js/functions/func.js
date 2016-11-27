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
    console.log(month_names[i]);
    return month_names[i];
  }
  else if (mode==1) {
    console.log(month_names[i]);
    return month_names_short[i];
  }

}

function createChart(id,cTitle,data) {
console.log("Creating chart");
 var chart = new CanvasJS.Chart(id,
 {
   height: 250, //in pixels
     width: window.innerWidth-50,
   title:{
     text: cTitle
   },
   legend: {
     maxWidth: 350,
     itemWidth: 120
   },
   data: [
   {
     type: "pie",
     showInLegend: true,
     legendText: "{indexLabel}",
     dataPoints:data
   }
   ]
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
  console.log("m:"+mm);
  var yy=d.getYear().toString().substr(1,2);
  var key=dd+mm+yy;
  console.log(key);
  return key;
}
//60215 280216
//key1>key2
function keyEquals(key1,key2)
{
//  console.log("key1:"+key1+" key2:"+key2);
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
//  console.log("keys:"+keys+"stkey "+stKey);
  flag=false;

  for(i=0;i<keys.length;i++)
  {
  //  console.log("keys[i]"+keys[i]+"stKey"+stKey);
    if(keys[i].substr(0,1)=="i")
    {
      console.log("Found I");
      keys[i]=keys[i].substr(1,keys[i].length-1);
      flag=true;
    }
    if((keyEquals(keys[i],stKey)||(keys[i]==stKey))&&(keyEquals(endKey,keys[i])||(keys[i]==endKey)))
    {
      if(flag==true)
      {
        console.log("Found I");
        keys[i]="i"+keys[i];
      }
      tmp.push(keys[i]);
    }
  }

  console.log("endKey"+endKey+"Selected:"+tmp);
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

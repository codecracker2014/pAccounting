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

function createChart(cTitle,data) {
console.log("Creating chart");
 var chart = new CanvasJS.Chart("chartContainer",
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

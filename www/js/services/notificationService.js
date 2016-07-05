angular.module('starter.services')

.service('notificationService', function($http){

  this.notification={};
  var postData={"sender": {
        "mob": "9950607306",
  "pass":"gajendra",
        "name": "sfsff"
    }
};
this.loadNotification=function(){

$http.defaults.headers.post["Content-Type"] = "application/json";
$http.defaults.headers.post["Accept"] = "application/json";
$http.defaults.useXDomain = true;
var d=angular.toJson(postData);
console.log(d);
var config = {headers:{Accept:'application/json','Content-Type':'application/json'}};
  $http({url:'/getnot',method:'POST',data:d,headers:{Accept:'application/json','Content-Type':'application/json'}})
.success(function(data, status, headers, config) {
    this.notification=angular.toJson(data);
    console.log(data);
    console.log("got not "+this.notification+" data "+data);
  })
  .error(function(data, status, headers, config) {
    console.log("error occured in http");
});
/*

*/
console.log("Returning");
return this.notification;
}
});

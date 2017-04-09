angular.module('starter.services')

.service('notificationService', function($http,$timeout,ServerEndpoint){
  //console.log("notificationService.js");

  this.notificationCount=0;
  this.pushNotification=function(data,toList)
  {
    console.log("Pushing "+data);
    var user=JSON.parse(localStorage.getItem("user"));
    if(user.verified==null || user.verified==false)
    {
      return;
    }
    var dataToPush={};
    dataToPush["senderMob"]=user.mob;
    dataToPush["receiversMob"]=toList;
    dataToPush["data"]=angular.toJson(data);
    var token=JSON.parse(localStorage.getItem("u-token"));
    $http.post(ServerEndpoint.url+"/auth/notification/push",dataToPush,
    {headers:{"token":token}})
      .then(function(data){
          if(data.data!=null && data.data=="ACCEPTED")
          {
              console.log("Notification pushed ");
          }
          else{
            return;
          }
        }, function (){console.log("ERROR ");});

  }
  this.fetchNotifications=function()
  {
    console.log("Fetching data ");
    this.scheduled=false;
    var user=JSON.parse(localStorage.getItem("user"));
    if(user==null || user.verified==null || user.verified==false)
    {
      return;
    }
    var token=JSON.parse(localStorage.getItem("u-token"));

    if(token==null)
    {
      var dataToSend={"username":user.name,"mobileNum":user.mob,"password":user.password};
      $http.post(ServerEndpoint.url+"/auth/user/getToken/",dataToSend)
        .then(function(data){
            if(data.data!=null && data.data.token!=null)
            {
              token=data.data.token;
              localStorage.setItem("u-token",angular.toJson(data.data.token));
            }
            else{
              return;
            }
          }, function (){console.log("ERROR ");});

    }

    $http.get(ServerEndpoint.url+"/auth/notification/getNotification/"+user.mob,
    {headers:{"token":token}})
      .then(function(data){

            if(data!=null && data.data != null && data.data != "")
            {
              var localNotifications=JSON.parse(localStorage.getItem("notifications"));
              if(localNotifications==null)
              {
                localNotifications=data.data;
              }else {
                localNotifications=localNotifications.concat(data.data);
              }
              this.notificationCount=localNotifications.length;
              localStorage.setItem("notifications",angular.toJson(localNotifications));
            }
        }, function (){

          console.log("ERROR ");
        });
        console.log("SCHEDUING FOR 500 ");

  }
    this.getSavedNotifications=function()
    {
        return JSON.parse(localStorage.getItem("notifications"));
    }
    console.log(this.scheduled);
    console.log("Fetching ");
    this.fetchNotifications();

//    $timeout(this.fetchNotifications,500);

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
//console.log(d);
var config = {headers:{Accept:'application/json','Content-Type':'application/json'}};
  $http({url:'/getnot',method:'POST',data:d,headers:{Accept:'application/json','Content-Type':'application/json'}})
.success(function(data, status, headers, config) {
    this.notification=angular.toJson(data);
    //console.log(data);
    //console.log("got not "+this.notification+" data "+data);
  })
  .error(function(data, status, headers, config) {
    //console.log("error occured in http");
});
/*

*/
//console.log("Returning");
return this.notification;
}
});

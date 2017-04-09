angular.module('starter.controllers')
.controller('SignInCtrl', function($scope, $state,$http,ServerEndpoint) {
  //console.log("SignInCtrl called");
  $scope.hideClass="ng-hide";

  $scope.goToHome=function()
  {
    $state.go('tab.dash');
  }
  $scope.logInUser=function(user)
  {
    if(user==null||user.name==null||user.name==""||user.mob==null||user.mob=="")
    {
      //console.log("error");
      alert("Fill correct details");
      return;
    }
    var dataToSend={"username":user.name,"mobileNum":user.mob,"password":user.password};
    var token="";
    $http.post(ServerEndpoint.url+"/auth/user/getToken/",dataToSend)
      .then(function(data){
        alert("data "+data.data);
          if(data.data!=null && data.data.token!=null && data.data.token!="null")
          {
            token=data.data.token;
            user["verified"]=true;
            localStorage.setItem("u-token",angular.toJson(data.data.token));
            localStorage.setItem("user",angular.toJson(user));
            $state.go('tab.dash');
          }
          else{
              alert("credentials not correct");
            return;
          }
        }, function (err ){ alert("ERROR"+ServerEndpoint.url+" " +err.status); console.log(err.status);});


  }
  $scope.signIn = function(user) {
    //console.log('Sign-In', user);
    if(user==null||user.name==null||user.name==""||user.mob==null||user.mob=="")
    {
      //console.log("error");
      alert("Fill correct details");
    }
    else
    {

      var dataToSend={"username":user.name,"mobileNum":user.mob,"password":user.password};
      if($scope.hideClass=="")
      {
        dataToSend["lastOtp"]=user.otp;
        $http.post(ServerEndpoint.url+"/auth/user/verify/",dataToSend)
          .then(function(data){
              if(data.data=="ACCEPTED")
              {
                user["verified"]=true;
                localStorage.setItem("user",angular.toJson(user));
                $state.go('tab.dash');
              }
              else{

                $scope.message="Otp is wrong";
              }
            }, function (){console.log("ERROR ");});

      }
      else {
        $http.post(ServerEndpoint.url+"/auth/user/register/",dataToSend)
          .then(function(data){
              if(data.data=="ACCEPTED")
              {
                user["verified"]=true;
                localStorage.setItem("user",angular.toJson(user));
                $state.go('tab.dash');
              }
              else if(data.data=="CREATED" || data.data=="ALREADY_REPORTED") {
                $scope.hideClass="";
                $scope.message="Otp sent on your mobile";
              }
            }, function (){console.log("ERROR ");});

      }
      //localStorage.setItem("user",angular.toJson(user));
      //

    }
  };

})

angular.module('starter.controllers')
.controller('SignInCtrl', function($scope, $state) {

  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    if(user==null||user.name==null||user.name==""||user.mob==null||user.mob=="")
    {
      console.log("error");
      alert("Fill correct details");
    }
    else
    {
      localStorage.setItem("user",angular.toJson(user));
      $state.go('tab.dash');

    }
  };

})

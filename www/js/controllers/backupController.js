angular.module('starter.controllers')

.controller('backupController', function($scope,$cordovaFile,dao,$ionicLoading) {
  //console.log("backupController called");
  

$scope.exportData=function()
{

    var data=angular.toJson(localStorage);
    $scope.message="Exporting data";
    try{
          $scope.message=$scope.message+"Creating directory pAccounting/backup";
          $scope.message=$scope.message+"Created directory pAccounting/backup";

          $cordovaFile.writeFile(cordova.file.externalDataDirectory, "backup.txt", data, true)
               .then(function (success) {
                 alert("Data export done");
               }, function (error) {
                 $scope.message=$scope.message+"error occured while taking backup"+error.message;
               });
        }catch(err)
        {
          alert(err.message);
        }
}

$scope.importData=function()
{

  try{

         $cordovaFile.readAsText(cordova.file.externalDataDirectory, "backup.txt")
         .then(function (success) {
           var dataImported=JSON.parse(success);
           var allKeys=Object.getOwnPropertyNames(dataImported);
           var size=allKeys.length;
           for(var i=0;i<size;i++)
           {
             var key=allKeys[i];
             localStorage.setItem(key,dataImported[key]);
           }
           alert("Data import done");
           dao.refresh();
         }, function (error) {
           alert("No backup exists on your device");
         });
     }catch(err)
     {
       alert(err.message);
     }

}

})

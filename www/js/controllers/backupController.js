angular.module('starter.controllers')

.controller('backupController', function($scope,$cordovaFile,dao,$ionicLoading) {


$scope.exportData=function()
{

    var data=angular.toJson(localStorage);
    try{
      $cordovaFile.checkDir(cordova.file.externalRootDirectory, "pAccounting/backup")
     .then(function (success) {
      $cordovaFile.writeFile(cordova.file.externalRootDirectory, "pAccounting/backup/backup.txt", data, true)
           .then(function (success) {
           }, function (error) {
           });
     }, function (error) {
       $cordovaFile.createDir(cordova.file.externalRootDirectory, "pAccounting/backup", false)
        .then(function (success) {
          $cordovaFile.writeFile(cordova.file.externalRootDirectory, "pAccounting/backup/backup.txt", data, true)
               .then(function (success) {
                 alert("Data export done");
               }, function (error) {
               });
        }, function (error) {
        });
     });
        }catch(err)
        {
          alert(err.message);
        }
}

$scope.importData=function()
{

  try{
  $cordovaFile.checkFile(cordova.file.externalRootDirectory, "pAccounting/backup/backup.txt")
       .then(function (success) {
         $cordovaFile.readAsText(cordova.file.externalRootDirectory, "pAccounting/backup/backup.txt")
         .then(function (success) {
           var dataImported=JSON.parse(success);
           var allKeys=Object.getOwnPropertyNames(dataImported);
           var size=allKeys.length;
          //  $ionicLoading.show({showDelay: 0});
           for(var i=0;i<size;i++)
           {
             var key=allKeys[i];
             localStorage.setItem(key,dataImported[key]);
           }
           alert("Data import done");
          //  $ionicLoading.hide();
           dao.refresh();
         }, function (error) {
           // error
         });

       }, function (error) {
         alert("No backup exists on your device");
       });

     }catch(err)
     {
     }

}

})

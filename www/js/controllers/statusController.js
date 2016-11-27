angular.module('starter.controllers')

.controller('statusController', function($scope,dao,statusService,$ionicActionSheet,$timeout,levelService,incomeService) {
  $scope.todos=[];
  $scope.todos.date=new Date();
  $scope.todos.getM=getMonthName($scope.todos.date.getMonth());
	statusService.monthlyStatus();
  statusService.monthlyStatusI();
  $scope.mStatus=statusService.mStatus;
  $scope.items=statusService.items;
	$scope.status=statusService;
	$scope.height=statusService.width;
	$scope.width=statusService.height;
	$scope.hideChart="ng-hide";
	$scope.hideTotals="";
	$scope.hideHistogram="ng-hide";
  $scope.leve1Hide="";
  $scope.levelHide="ng-hide";
  console.log("Status dd "+statusService.startDate);

	$scope.show = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: 'Totals' },
       { text: 'Pie Chart' },
			 { text: 'Histogram' }
     ],
     titleText: 'Stastics',
     cancelText: 'Cancel',
     cancel: function() {
          console.log("I was called");
        },
     buttonClicked: function(index) {
			 console.log("index"+index);
			 if(index==0)
			 {
				 $scope.hideChart="ng-hide";
				 $scope.hideTotals="";
				 $scope.hideHistogram="ng-hide";
			 }
			 else if(index==1)
			 {
				 $scope.hideHistogram="ng-hide";
				 $scope.hideChart="";
				 $scope.hideTotals="ng-hide";
			 }
			 else if(index==2)
			 {
				 $scope.hideHistogram="";
				 $scope.hideChart="ng-hide";
				 $scope.hideTotals="ng-hide";
			 }

       return true;
     }
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 2000);

 };

$scope.showLevel=function()
{
	console.log("dl");
	levels=dao.getLevels();
	var hideSheet = $ionicActionSheet.show({
		buttons: levels,
		titleText: 'Levels',
		cancelText: 'Cancel',
		cancel: function() {
				 console.log("I was called");
			 },
		buttonClicked: function(index) {

				if(index==0)
				{

					dao.addLevel();
					dao.updateLevel(levels.length-1);
					 $scope.level=dao.level;
					$scope.levelHide="";
					$scope.level1Hide="ng-hide";

				}
				else if(index==1)
				{
					$scope.level1Hide="";
					$scope.levelHide="ng-hide";
					dao.updateLevel(index);
				 $scope.level=dao.level;

				}
				else
				{
					$scope.levelHide="";
					$scope.level1Hide="ng-hide";

				 dao.updateLevel(index);
				 $scope.level=dao.level;
				 $scope.groups=dao.groups;
         levelService.refresh();
			 }
			return true;
		}
	})

	// For example's sake, hide the sheet after two seconds
	$timeout(function() {
		hideSheet();
	}, 4000);


}



});

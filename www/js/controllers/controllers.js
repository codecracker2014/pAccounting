angular.module('starter.controllers', [])

<<<<<<< HEAD
.controller('starter',function ($scope,dao,statusService,$ionicSlideBoxDelegate,incomeService) {
	// body...
	//$scope.dt=AppDate.getAppDate();

console.log("L");

=======
.controller('starter',function ($scope,dao,statusService,$ionicSlideBoxDelegate) {
	// body...
	//$scope.dt=AppDate.getAppDate();
>>>>>>> 64cfcf48d717ff02916c9f4570b85c864e521c18
	$scope.currentDate = dao.date;
	$scope.month=month_name(dao.date.getMonth(),1);
	$scope.level=dao.level;
	console.log("month"+$scope.month);

	//$scope.minDate = new Date($scope.currentDate.getYear(), $scope.currentDate.getMonth(), 1);
	//$scope.maxDate = new Date($scope.currentDate.getYear(), $scope.currentDate.getMonth(), 30);
	$scope.datePickerCallback = function (val) {
		if (!val) {
			console.log('Date not selected');
		} else {

		//$ionicSlideBoxDelegate.start();
			AppDate.dt=val;
			dao.date=val;
			dao.refresh();
<<<<<<< HEAD
			incomeService.refresh();
=======
>>>>>>> 64cfcf48d717ff02916c9f4570b85c864e521c18
			console.log(dao.today);
			console.log(AppDate.getAppDate());
			console.log('Selected date is : ', val);
			$scope.month=month_name(dao.date.getMonth(),1);

			$ionicSlideBoxDelegate.update();
			console.log("Updated");
		}
	};
<<<<<<< HEAD




=======
>>>>>>> 64cfcf48d717ff02916c9f4570b85c864e521c18
//Start date
	$scope.currentDate1 = statusService.startDate;
	$scope.month1=month_name(statusService.startDate.getMonth(),1);
	console.log("month1"+$scope.month1);
	//$scope.minDate = new Date($scope.currentDate.getYear(), $scope.currentDate.getMonth(), 1);
	//$scope.maxDate = new Date($scope.currentDate.getYear(), $scope.currentDate.getMonth(), 30);
	$scope.datePickerCallback1 = function (val) {
		if (!val) {
			console.log('Date not selected');
		} else {
			statusService.startDate=val;
			statusService.refresh();
			console.log('Selected date is : ', val);
			$scope.month1=month_name(statusService.startDate.getMonth(),1);

		}
	};

//end Date
$scope.currentDate2 = statusService.endDate;
$scope.month2=month_name(statusService.endDate.getMonth(),1);
console.log("month2"+$scope.month2);
//$scope.minDate = new Date($scope.currentDate.getYear(), $scope.currentDate.getMonth(), 1);
//$scope.maxDate = new Date($scope.currentDate.getYear(), $scope.currentDate.getMonth(), 30);
$scope.datePickerCallback2 = function (val) {
	if (!val) {
		console.log('Date not selected');
	} else {
		statusService.endDate=val;
		statusService.refresh();

		console.log('Selected date is : ', val);
		$scope.month2=month_name(statusService.endDate.getMonth(),1);

	}
};

<<<<<<< HEAD
console.log("E");
=======

>>>>>>> 64cfcf48d717ff02916c9f4570b85c864e521c18

})




//Status controller

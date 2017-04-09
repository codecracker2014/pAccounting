angular.module('starter.controllers', [])

.controller('starter',function ($scope,dao,$ionicSlideBoxDelegate,incomeService,eventsRepo,simpleTransactionService) {
	// body...
	//$scope.dt=AppDate.getAppDate();
/*
	//console.log("controllers.js called");
	
	$scope.currentDate = dao.date;
	$scope.month=month_name(dao.date.getMonth(),1);
	$scope.level=dao.level;

	//console.log("month"+dao.date);
	$scope.onezoneDatepicker = {
	    date: $scope.currentDate,
	    mondayFirst: false,
	    disablePastDays: false,
	    disableSwipe: false,
	    disableWeekend: false,
	    showDatepicker: false,
	    showTodayButton: true,
	    calendarMode: false,
	    hideCancelButton: false,
	    hideSetButton: false,

	    callback: function(val){

				//console.log("callback"+val);
				AppDate.dt=val;
				dao.date=val;
				dao.refresh();
				incomeService.refresh();
				//console.log(dao.today);
				//console.log(AppDate.getAppDate());
				//console.log('Selected date is : ', val);
				$scope.month=month_name(dao.date.getMonth(),1);

				$ionicSlideBoxDelegate.update();
				//console.log("Updated");

	    }
	};
//Start date




	$scope.currentDate1 = statusService.startDate;
	$scope.month1=month_name(statusService.startDate.getMonth(),1);
	//console.log("sd "+statusService.startDate);
	//$scope.minDate = new Date($scope.currentDate.getYear(), $scope.currentDate.getMonth(), 1);
	//$scope.maxDate = new Date($scope.currentDate.getYear(), $scope.currentDate.getMonth(), 30);

	$scope.onezoneDatepicker1 = {
	    date: $scope.currentDate1,
	    mondayFirst: false,
	    disablePastDays: false,
	    disableSwipe: false,
	    disableWeekend: false,
	    showDatepicker: false,
	    showTodayButton: true,
	    calendarMode: false,
	    hideCancelButton: false,
	    hideSetButton: false,

	    callback: function(val){

				statusService.startDate=val;
				statusService.refresh();
				//console.log('Selected date is : ', val);
				$scope.month1=month_name(statusService.startDate.getMonth(),1);

	    }
	};
//end Date
$scope.currentDate2 = statusService.endDate;
$scope.month2=month_name(statusService.endDate.getMonth(),1);
//console.log("month2"+$scope.month2);
//$scope.minDate = new Date($scope.currentDate.getYear(), $scope.currentDate.getMonth(), 1);
//$scope.maxDate = new Date($scope.currentDate.getYear(), $scope.currentDate.getMonth(), 30);
$scope.onezoneDatepicker2 = {
		date: $scope.currentDate2,
		mondayFirst: false,
		disablePastDays: false,
		disableSwipe: false,
		disableWeekend: false,
		showDatepicker: false,
		showTodayButton: true,
		calendarMode: false,
		hideCancelButton: false,
		hideSetButton: false,

		callback: function(val){

			statusService.endDate=val;
			statusService.refresh();

			//console.log('Selected date is : ', val);
			$scope.month2=month_name(statusService.endDate.getMonth(),1);

		}
};







$scope.currentDate3 = eventsRepo.formDate;
$scope.onezoneDatepicker3 = {
		date: $scope.currentDate3,
		mondayFirst: false,
		disablePastDays: false,
		disableSwipe: false,
		disableWeekend: false,
		showDatepicker: false,
		showTodayButton: true,
		calendarMode: false,
		hideCancelButton: false,
		hideSetButton: false,

		callback: function(val){

			//console.log("callback"+val);
			eventsRepo.formDate=val;
			$ionicSlideBoxDelegate.update();
			//console.log("Updated");

		}
};




$scope.currentDate4 = simpleTransactionService.formDate;
$scope.onezoneDatepicker4 = {
		date: $scope.currentDate4,
		mondayFirst: false,
		disablePastDays: false,
		disableSwipe: false,
		disableWeekend: false,
		showDatepicker: false,
		showTodayButton: true,
		calendarMode: false,
		hideCancelButton: false,
		hideSetButton: false,

		callback: function(val){

			//console.log("callback"+val);
			simpleTransactionService.formDate=val;
			$ionicSlideBoxDelegate.update();
			//console.log("Updated");

		}
};


$scope.currentDate5 = statusService.startDate;
$scope.month5=month_name(statusService.startDate.getMonth(),1);
//console.log("month1"+$scope.month5);

//console.log("month5 ds "+statusService.startDate);
$scope.onezoneDatepicker5 = {
		date: $scope.currentDate5,
		mondayFirst: false,
		disablePastDays: false,
		disableSwipe: false,
		disableWeekend: false,
		showDatepicker: false,
		showTodayButton: true,
		calendarMode: false,
		hideCancelButton: false,
		hideSetButton: false,

		callback: function(val){
      //console.log("Start ds "+statusService.startDate);
			statusService.startDate=new Date(val.getFullYear(), val.getMonth() , 1);;

			//console.log('Selected date is : ', val);
			$scope.month1=month_name(statusService.startDate.getMonth(),1);
      var lastDay = new Date(val.getFullYear(), val.getMonth() + 1, 0);
			statusService.endDate=lastDay;
      statusService.refresh();
			//console.log(lastDay);
		}
};
*/
})

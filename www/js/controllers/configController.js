angular.module('starter.controllers')

.controller('configController', function($scope,dao,$ionicScrollDelegate,$ionicActionSheet,$timeout,$ionicPopup,service) {

  //var tmp=[{fr:1,did:true,name:'travel',desc:'',amount:20,date:''},{fr:1,did:true,name:'lunch',desc:'',amount:40,date:''},{fr:30,did:true,name:'home',desc:'For home',amount:15000,date:'01'}];
  //localStorage.setItem("eTemplets",JSON.stringify(tmp));
	//console.log("configController.js called");


	$scope.level=dao.level;
	$scope.level1Hide="";
	$scope.levelHide="ng-hide";
  //console.log("Config called");
	$scope.exp=dao.getEtemplets();
	if($scope.exp==null)
	$scope.exp=[];
	$scope.exp.saveButton="block";
	$scope.exp.saveLabel="Save";
	$scope.delLabel="true";
	$scope.hide="ng-hide";
	$scope.dhide="ng-hide";
	$scope.showForm="ng-hide";
	$scope.action="save"
	$scope.state="n";
	$scope.cateList=dao.getCatList();
	$scope.groups=dao.groups;
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			//console.log("11");
			$scope.shownGroup = null;
		} else {

			$scope.shownGroup = group;
		}
	};
	$scope.isGroupShown = function(group) {

		return this.shownGroup === group;
	};

	var dummyExp={fr:1,did:true,name:'',desc:'',amount:'',date:''};
  if($scope.exp==null)
  {
    //console.log("1");
    $scope.exp=[];

  }
	$scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };
	/*DAte picker controll
	$scope.currentDate = new Date();
	$scope.minDate = new Date($scope.currentDate.getYear(), $scope.currentDate.getMonth(), 1);
	$scope.maxDate = new Date($scope.currentDate.getYear(), $scope.currentDate.getMonth(), 30);
	$scope.datePickerCallback = function (val) {
		if (!val) {
			//console.log('Date not selected');
		} else {
			//console.log('Selected date is : ', val);ng-disabled="expForm.$invalid"
		}
	};*/
  //console.log($scope.exp);
	$scope.inc=[{fr:30,did:true,name:'salary',desc:'Salary income',amount:33835,date:'01'}];
	$scope.en={fr:1,did:true,name:'',desc:'',amount:'',date:''};
  //console.log($scope.en);
  //localStorage.removeItem("eTemplets");
	$scope.save=function()
	{
		//var e={fr:$scope.nfr,did:$scope.ndid,name:$scope.nname,desc:$scope.ndesc,amount:$scope.namount,date:$scope.ndate};save()
		if($scope.state=="n")
		{
		$scope.exp.push($scope.en);
    //console.log("my en");
    //console.log($scope.en);
    //localStorage.removeItem("eTemplets");
    localStorage.setItem("eTemplets",JSON.stringify($scope.exp));
		//console.log(JSON.parse(localStorage.getItem("eTemplets")));
		//$scope.en={fr:1,did:true,name:'',desc:'',amount:'',date:''};
    dao.refresh();
    $scope.en={fr:1,did:true,name:'',desc:'',amount:'',date:''};

		}
		else
		{
			//console.log("Update");
			var i=0;
			for(i=0;i<$scope.exp.length;i++)
			{
				if($scope.exp[i].name==$scope.en.name)
				{
					//console.log("found");
					$scope.exp[i]=$scope.en;
					break;
				}
			}
			localStorage.setItem("eTemplets",JSON.stringify($scope.exp));
			dao.refresh();
	    $scope.en={fr:1,did:true,name:'',desc:'',amount:'',date:''};
			$scope.cancel();
		}
	}
	$scope.update=function(e){
		$scope.en=e;
		$scope.exp.saveButton="calm";
		$scope.exp.saveLabel="Update";
		$scope.delLabel="false";
		$scope.hide="";
		$scope.dhide="";
		$scope.state="u"
		$scope.showForm="";
		$scope.scrollTop();
	}
	$scope.cancel=function()
	{
		$scope.en=dummyExp;
		$scope.exp.saveButton="block";
		$scope.exp.saveLabel="Save";
		$scope.delLabel="false";
		$scope.hide="ng-hide";
		$scope.hide="ng-hide";
		$scope.state="n"
		$scope.showForm="ng-hide";
	}
	$scope.delete=function()
	{
		//console.log("Delete en");
		var i=0;
		//console.log($scope.en);
		for(i=0;i<$scope.exp.length;i++)
		{
			//console.log($scope.exp);
			if($scope.exp[i].name==$scope.en.name)
			{
				//console.log("found to delete");
				$scope.exp.splice(i, 1);
				break;
			}
		}
		//console.log($scope.exp);
		localStorage.setItem("eTemplets",JSON.stringify($scope.exp));
		dao.refresh();
		$scope.en={fr:1,did:true,name:'',desc:'',amount:'',date:''};
		$scope.cancel();

	}
	//Add Expense
	$scope.showAddE=function()
	{

		$scope.exp.saveButton="calm";
		$scope.exp.saveLabel="Save";
		$scope.hide="";

		$scope.state="n"
		$scope.showForm="";
	}
	$scope.show = function() {

	 // Show the action sheet

	 levels=dao.getLevels();
	 var hideSheet = $ionicActionSheet.show({
		 buttons: levels,
		 titleText: 'Levels',
		 cancelText: 'Cancel',
		 cancel: function() {
					//console.log("I was called");
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
				}
			 return true;
		 }
	 })

	 // For example's sake, hide the sheet after two seconds
	 $timeout(function() {
		 hideSheet();
	 }, 4000);

 };
$scope.showPopup=function()
{
	$scope.catAdd = {};
	var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="catAdd.name">',
    title: 'Enter Category Name',
    subTitle: '',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if ($scope.catAdd.name==null) {
//						//console.log("me"+$scope.catAdd.name);
			      //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
	//					//console.log($scope.catAdd.name);
						dao.addNewCategory($scope.catAdd.name);
						dao.refresh();
						$scope.cateList=dao.getCatList();
						$scope.groups=dao.groups;

		        return $scope.catAdd.name;
          }
        }
      }
    ]
  });
}

$scope.showSelect=function(name)
{
	$scope.list=[];
  //console.log("name"+name);
	$scope.list=service.getExpList();
	//console.log($scope.list);
	$scope.listData={};
	$scope.listData.name=name;
	var myPopup = $ionicPopup.show({
    template: "<div class='list'> <label class='item item-input item-select'><div class='input-label'> Expenses </div>\
		<select ng-model='listData.selected'><option ng-repeat='itm in list track by $index'>{{itm}}</option></select> </label></div>",
    title: 'Enter Category Name',
    subTitle: '',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Add</b>',
        type: 'button-positive',
        onTap: function(e) {
          if ($scope.listData.selected==null) {
//						//console.log("me"+$scope.catAdd.name);
			      //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
	//					//console.log($scope.catAdd.name);
						dao.addNewExp($scope.listData.name,$scope.listData.selected);
						dao.refresh();
						$scope.cateList=dao.getCatList();
						$scope.groups=dao.groups;

		        return $scope.listData.selected;
          }
        }
      }
    ]
  });
}
})

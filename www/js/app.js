// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js url: 'http://pa-gajendra.rhcloud.com/
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','onezone-datepicker','ngCordova'])
.constant('ServerEndpoint', {
  url: 'http://localhost:8100'
})
.run(function($ionicPlatform,$ionicLoading) {
  $ionicPlatform.ready(function($ionicPopup) {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                  });
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  //  db = $cordovaSQLite.openDB("my.db");
//    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
$ionicLoading.hide();


  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  //console.log("LL");
    $ionicConfigProvider.tabs.position('bottom');
  $stateProvider


  .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'SignInCtrl'
    })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has itsclass="button icon ion- item-avatar" own nav history stack:
  .state('tab.datePicker', {
  url: '/datePicker',
  abstract: true,
  templateUrl: 'templates/datePicker.html'
})



  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tr-entry.html',
        controller: 'activeTodoController'
      }
    }
  })


  .state('tab.list-notifications', {
      url: '/list-notifications',
      views: {
        'tab-dash': {
          templateUrl: 'templates/notification-list.html',
          controller: 'appNotifications'
        }
      }
    })


  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'statusController'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-setting.html',
        controller: 'configController'
      }
    }
  })
  .state('tab.backup', {
    url: '/backup',
    views: {
      'tab-account': {
        templateUrl: 'templates/backup.html',
        controller: 'backupController'
      }
    }
  })

  .state('tab.planning', {
    url: '/planning',
    views: {
      'tab-planning': {
        templateUrl: 'templates/tab-planning.html',
        controller: 'planningController'
      }
    }
  })
  .state('tab.add-event', {
      url: '/add-event/:billId',
      views: {
        'tab-planning': {
          templateUrl: 'templates/add-event.html',
          controller: 'addEventController'
        }
      }
    })


.state('tab.user-list', {
      url: '/user-list',
      views: {
        'tab-planning': {
          templateUrl: 'templates/user-list.html',
          controller: 'userList'
        }
      }
    })
.state('tab.simple-lending', {
          cache: false,
          url: '/simple-lending',
          views: {
            'tab-planning': {
              templateUrl: 'templates/simple-lending.html',
              controller: 'simpleLendingController'
            }
          },
          params: {data:null}
        })
.state('tab.lending-detail', {
          url: '/lending-detail/:mob',
          views: {
            'tab-planning': {
              templateUrl: 'templates/lending-detail.html',
              controller: 'lendingDetailController'
            }
          }
        })


  .state('tab.addIncome', {
    url: '/addIncome',
    views: {
      'tab-account': {
        templateUrl: 'templates/add-income-view.html',
        controller: 'incomeController'
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  var user=JSON.parse(localStorage.getItem("user"));
  if(user==null)
  {
      $urlRouterProvider.otherwise('/sign-in');
  }
  else {
      $urlRouterProvider.otherwise('/tab/dash');
  }


});

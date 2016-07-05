// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ionic-datepicker','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  console.log("LL");
    $ionicConfigProvider.tabs.position('bottom');
  $stateProvider

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

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'statusController'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
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

  .state('tab.planning', {
    url: '/planning',
    views: {
      'tab-planning': {
        templateUrl: 'templates/tab-planning.html',
        controller: 'planningController'
      }
    }
  })
<<<<<<< HEAD
  .state('tab.add-event', {
      url: '/add-event',
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
  

  .state('tab.addIncome', {
    url: '/addIncome',
    views: {
      'tab-account': {
        templateUrl: 'templates/add-income-view.html',
        controller: 'incomeController'
=======
  
  .state('tab.planView', {
    url: '/planView',
    views: {
      'tab-planning': {
        templateUrl: 'templates/planView.html',
        controller: 'planningController'
>>>>>>> 64cfcf48d717ff02916c9f4570b85c864e521c18
      }
    }
  });


<<<<<<< HEAD

=======
>>>>>>> 64cfcf48d717ff02916c9f4570b85c864e521c18
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

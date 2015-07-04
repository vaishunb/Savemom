'use strict';

angular.module('MyApp', [
  'ionic',
  'firebase',
  'MyApp.services',
  'MyApp.directives',
  'MyApp.controllers'
])
.config(function($stateProvider, $urlRouterProvider) {
  var resolve = {
    auth: function($q, $timeout, Auth, User) {
      var defer = $q.defer();
      var state = this;

      Auth.getCurrentUser().then(function() {
        User.loadCurrentUser().then(function() {
          if (state.name === 'change-password') {
            defer.resolve();
          } else {
            if (User.hasChangedPassword()) {
              defer.resolve();
            } else {
              defer.reject('change-password');
            }
          }
        });
      }, function() {
        $timeout(function() { // See: http://stackoverflow.com/q/24945731/247243
          defer.reject('login');
        }, 250);
      });

      return defer.promise;
    }
  };

  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'sidemenu/sidemenu.html',
      controller: 'SideMenuCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'signup/signup.html',
      controller: 'SignupCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'login/login.html',
      controller: 'LoginCtrl'
    })
    .state('reset-password', {
      url: '/reset-password',
      templateUrl: 'reset-password/reset-password.html',
      controller: 'ResetPasswordCtrl'
    })
    .state('change-password', {
      url: '/change-password',
      templateUrl: 'change-password/change-password.html',
      controller: 'ChangePasswordCtrl',
      resolve: resolve
    })
    
    .state('app.checkup', {
      url: '/checkup', 
      views: {
        menuContent: {
          templateUrl: 'dashboard/checkup.html',
          controller: 'ComponentsCtrl',
          resolve: resolve
        }
      }
    })

    .state('app.previous', {
      url: '/previous', 
      views: {
        menuContent: {
          templateUrl: 'dashboard/previous.html',
          controller: 'ComponentsCtrl',
          resolve: resolve
        }
      }
    })

    .state('app.feedback', {
      url: '/feedback', 
      views: {
        menuContent: {
          templateUrl: 'dashboard/feedback.html',
          controller: 'ComponentsCtrl',
          resolve: resolve
        }
      }
    })

    .state('app.profile', {
      url: '/profile', 
      views: {
        menuContent: {
          templateUrl: 'dashboard/profile.html',
          controller: 'ComponentsCtrl',
          resolve: resolve
        }
      }
    })

    .state('app.health', {
      url: '/health', 
      views: {
        menuContent: {
          templateUrl: 'dashboard/health.html',
          controller: 'ComponentsCtrl',
          resolve: resolve
        }
      }
    })

    .state('app.tips', {
      url: '/tips', 
      views: {
        menuContent: {
          templateUrl: 'dashboard/tips.html',
          controller: 'ComponentsCtrl',
          resolve: resolve
        }
      }
    })

    .state('app.yoga', {
      url: '/yoga', 
      views: {
        menuContent: {
          templateUrl: 'dashboard/yoga.html',
          controller: 'ComponentsCtrl',
          resolve: resolve
        }
      }
    })

    .state('app.chakrasana', {
      url: '/chakrasana', 
      views: {
        menuContent: {
          templateUrl: 'dashboard/chakrasana.html',
          controller: 'ComponentsCtrl',
          resolve: resolve
        }
      }
    })


    .state('app.utkatasana', {
      url: '/utkatasana', 
      views: {
        menuContent: {
          templateUrl: 'dashboard/utkatasana.html',
          controller: 'ComponentsCtrl',
          resolve: resolve
        }
      }
    })


    .state('app.csyoga', {
      url: '/csyoga', 
      views: {
        menuContent: {
          templateUrl: 'dashboard/csyoga.html',
          controller: 'ComponentsCtrl',
          resolve: resolve
        }
      }
    })

    .state('app.food', {
      url: '/food', 
      views: {
        menuContent: {
          templateUrl: 'dashboard/food.html',
          controller: 'ComponentsCtrl',
          resolve: resolve
        }
      }
    })

    .state('app.scheme', {
      url: '/scheme', 
      views: {
        menuContent: {
          templateUrl: 'dashboard/scheme.html',
          controller: 'ComponentsCtrl',
          resolve: resolve
        }
      }
    })

   
    ;

  $urlRouterProvider.otherwise('/app/checkup');
})
.run(function($rootScope, $state, $ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory 
    // bar above the keyboard for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, 
                                                 fromState, fromParams, error) {
      $state.go(error);
    });
  });
})
.constant('FIREBASE_ROOT', 'https://moneybytes.firebaseio.com/');

angular.module('MyApp.services', []);
angular.module('MyApp.directives', []);
angular.module('MyApp.controllers', []);

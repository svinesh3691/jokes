'use strict';
angular.module('app')
  .run([ '$rootScope', '$state', '$stateParams','services','$location','$localStorage',function ($rootScope,   $state,   $stateParams, services, $location, $localStorage ) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;  
              $rootScope.mast_url = mast_url;
              $rootScope.base_url = base_url;
              $rootScope.api_site = api_site;
              $rootScope.api_base = api_base;
                     
                  $rootScope.loginmodal = function(dat) {
                        services.master('app/login',dat).then(function(result){
                                if(result.data.status == 1) {
                                    window.location.reload();
                                }else alert('The username/password you entered is wrong. Please try again');
                      });
                  };
                  $rootScope.getRandomSpan = function() {
                    return Math.floor((Math.random()*12)+1);
                  }
                  $rootScope.laughed = function(p) {
                        $rootScope.para = {};  $rootScope.para = {lau_pid: p};
                        services.master('app/laughed',$rootScope.para).then(function(result){ });  
                  }
                  $rootScope.laughno =  function(p) {
                        $rootScope.para = {}; $rootScope.para = {lau_pid: p};
                        services.master('app/laughno',$rootScope.para).then(function(result){ });  
                  }
                  $rootScope.cried = function(p) {
                        $rootScope.para = {}; $rootScope.para = {cry_pid: p};
                        services.master('app/cried',$rootScope.para).then(function(result){ });  
                  }
                  $rootScope.cryno =  function(p) {
                        $rootScope.para = {}; $rootScope.para = {cry_pid: p};
                        services.master('app/cryno',$rootScope.para).then(function(result){ });  
                  }
                  $rootScope.appit = function(p) {
                        $rootScope.para = {}; $rootScope.para = {post_id: p};
                        services.master('app/appit',$rootScope.para).then(function(result){ });  
                  }
                  $rootScope.appno =  function(p) {
                        $rootScope.para = {}; $rootScope.para = {post_id: p};
                        services.master('app/appno',$rootScope.para).then(function(result){ });  
                  }
                  $rootScope.logout= function() {
                      services.master('app/logout').then(function(result){
                        if(result.data.suc==1)  window.location.reload();
                      });
                  }

                  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
                          services.master('app/authen').then(function(result){
                                 $rootScope.authenticated = result.data;
                                 if($rootScope.authenticated.authe) {
                                    $rootScope.fname = $rootScope.authenticated.fname;
                                    $rootScope.fid   = $rootScope.authenticated.fid;
                                    $rootScope.ltp   = $rootScope.authenticated.ltp;
                                 }
                                 if($rootScope.authenticated.authe==false && toState.controller=='profile') {
                                    $location.path( "/app/home" );
                                 }
                          });     
                  });

                  $rootScope.$on('$stateChangeSuccess', function() {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                  });
  }])

  .config(
    [ '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
          
          $urlRouterProvider
              .otherwise('app/home');
            $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'tpl/app.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad){
                          return uiLoad.load(['ajs/controllers/home.controller.js']);
                      }]

                  },
                  controller: 'app'
              })
              .state('app.home', {
                  url: '/home',
                  templateUrl: 'tpl/modules/home.html',
                  controller: 'home',
                  resolve: {
                      joks: function(services,node) {
                                      this.para = {page: 1, count: 4,filtcat:""};
                                      return services.master('app/jokes', this.para);
                      },
                      yday: function(services,node) {
                              return services.master('app/yday');
                      },

                      ledr: function(services,node) {
                              return services.master('app/ledr');
                      },
                      cats: function(services,node) {
                              return services.master('app/cats');
                      },
                  },
              })

              .state('app.about', {
                  url: '/about',
                  templateUrl: 'tpl/modules/about.html',
              })
              .state('app.new', {
                  url: '/new',
                  templateUrl: 'tpl/modules/page.html',
                  controller: 'home'
              })
              .state('app.laughers', {
                  url: '/laughers',
                  templateUrl: 'tpl/modules/page.html',
                  controller: 'laughers',
                  resolve: {
                      joks: function(services) {
                                      this.para = {page: 1, count: 4};
                                      return services.master('app/laughersxx', this.para);
                              },
                  },


              })
              .state('app.fan_jokes', {
                  url: '/fan_jokes',
                  templateUrl: 'tpl/modules/fan_jokes.html',
                  controller: 'fan_jokes',
                  resolve: {
                      joks: function(services) {
                                      this.para = {page: 1, count: 4};
                                      return services.master('app/fan_jokes', this.para);
                              },
                  },
              })
              .state('app.profile', {
                    url: '/profile',
                    templateUrl: 'tpl/modules/profile.html',
                    controller: 'profile',
                    resolve: {
                        joks: function(services) {
                                      this.para = {page: 1, count: 4};
                                      return services.master('app/profile', this.para);
                              },
                        usrs: function(services) {
                                return services.master('app/user');
                              },
                        yday: function(services) {
                              return services.master('app/yday');
                        },

                    },
              })
              .state('app.profile_view', {
                    url: '/profile_view/:Id',
                    templateUrl: 'tpl/modules/profile_view.html',
                    controller: 'profile_view',
                    resolve: {
                        joks: function(services,$stateParams) {
                                      this.para = {page: 1, count: 4};
                                      return services.master('app/profile_view/'+$stateParams.Id, this.para);
                              },
                        usrs: function(services,$stateParams) {
                                return services.master('app/user_details/'+$stateParams.Id);
                              },
                    },
              })
              .state('app.joke', {
                    url: '/joke/:Id',
                    templateUrl: 'tpl/modules/joke.html',
                    controller: 'joke',
                    resolve: {
                        jok: function(services,$stateParams) {
                                      return services.master('app/joke/'+$stateParams.Id);
                           }  
                    },


              })
              .state('app.v', {
                    url: '/v/:Id',
                    templateUrl: 'tpl/modules/joke.html',
                    controller: 'joke',
                    resolve: {
                        jok: function(services,$stateParams) {
                                      return services.master('app/joke/'+$stateParams.Id);
                           }  
                    },


              })
              .state('app.edit', {
                    url: '/edit/:Id',
                    templateUrl: 'tpl/modules/edit.html',
                    controller: 'edit',
                    resolve: {
                      joks: function(services,$stateParams) {
                                      return  services.master('app/edit/'+$stateParams.Id);
                              },
                      cats: function(services) {
                                return services.master('app/cats');
                              },
                    },
              })
              .state('app.login', {
                  url: '/login',
                  templateUrl: 'tpl/modules/login.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad){
                          return uiLoad.load(['ajs/controllers/login.controller.js']);
                      }]
                  },
                  controller: 'login'
              })
              .state('app.change_password', {
                    url: '/change_password',
                    templateUrl: 'tpl/modules/change_password.html',
                    controller: 'change_password',
                    resolve: {
                      deps: ['uiLoad',
                        function( uiLoad){
                          return uiLoad.load(['ajs/controllers/login.controller.js']);
                      }]
                  },
              })
              .state('app.forgot_password', {
                    url: '/forgot_password',
                    templateUrl: 'tpl/modules/forgot_password.html',
                    controller: 'forgot_password',
                    resolve: {
                      deps: ['uiLoad',
                        function( uiLoad){
                          return uiLoad.load(['ajs/controllers/login.controller.js']);
                      }]
                  },
              })
              .state('app.logvin', {
                  url: '/logvin',
                  templateUrl: 'tpl/modules/logvin.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad){
                          return uiLoad.load(['ajs/controllers/login.controller.js']);
                      }]
                  },
                  controller: 'login'
              })
              .state('app.register', {
                  url: '/register',
                  templateUrl: 'tpl/modules/register.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad){
                          return uiLoad.load(['ajs/controllers/login.controller.js']);
                      }]

                  },
                  controller: 'register'
              })
              .state('app.terms_and_conditions', {
                  url: '/terms_and_conditions',
                  templateUrl: 'tpl/modules/tac.html',
              })
              .state('app.privacy_policy', {
                  url: '/privacy_policy',
                  templateUrl: 'tpl/modules/pp.html',
              })
      }
    ]
  );


app.factory("services", ['$http', function($http) {
    var serviceBase = api_site+'jokes/';
    var obj = {};
    obj.master = function(func_name,post_data){
        return $http.post(serviceBase + func_name, post_data);
    }
    obj.master_get = function(func_name,post_data){
        return $http.get(serviceBase + func_name, post_data);
    }
    return obj;   
}]);




app.factory("node", ['$http', function($http) {
    // var serviceBase = api_site+'jokes/';
    var serviceBase = 'http://localhost:8081/'
    var obj = {};
    obj.master = function(func_name,post_data){
        return $http.post(serviceBase + func_name, post_data);
    }
    obj.master_get = function(func_name,post_data){
        return $http.get(serviceBase + func_name, post_data);
    }
    return obj;   
}]);






app.directive('confirmationNeeded', function () {
  return {
    priority: 1,
    terminal: true,
    link: function (scope, element, attr) {
      var msg = attr.confirmationNeeded || "Are you sure?";
      var clickAction = attr.ngClick;
      element.bind('click',function (e) {
          e.preventDefault();
        if ( window.confirm(msg) ) {
          scope.$eval(clickAction)
        }
      });
    }
  };
});

app.directive('ngConfirmClick', [
  function(){
    return {
      priority: -1,
      restrict: 'A',
      link: function(scope, element, attrs){
        element.bind('click', function(e){
          var message = attrs.ngConfirmClick;
          if(message && !confirm(message)){
            e.stopImmediatePropagation();
            e.preventDefault();
          }
        });
      }
    }
  }
]);

app.directive('andyDraggable', function() {
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      var options = scope.$eval(attrs.andyDraggable); //allow options to be passed in
      elm.draggable(options);
    }
  };
});

var routeLoadingIndicator = function($rootScope) {
  return {
    restrict: 'E',
    // template:,
    templateUrl: 'tpl/loading.html',
    link: function(scope, elem, attrs) {
      scope.isRouteLoading = false;

      $rootScope.$on('$stateChangeStart', function() {
        scope.isRouteLoading = true;
      });

      $rootScope.$on('$stateChangeSuccess', function() {
        scope.isRouteLoading = false;
      });
    }
  };
};
routeLoadingIndicator.$inject = ['$rootScope'];

app.directive('routeLoadingIndicator', routeLoadingIndicator);

app.directive('confirmationNeeded', function () {
  return {
    priority: 1,
    terminal: true,
    link: function (scope, element, attr) {
      var msg = attr.confirmationNeeded || "Are you sure?";
      var clickAction = attr.ngClick;
      element.bind('click',function (e) {
          e.preventDefault();
        if ( window.confirm(msg) ) {
          scope.$eval(clickAction)
        }
      });
    }
  };
});

app.directive('ngConfirmClick', [
  function(){
    return {
      priority: -1,
      restrict: 'A',
      link: function(scope, element, attrs){
        element.bind('click', function(e){
          var message = attrs.ngConfirmClick;
          if(message && !confirm(message)){
            e.stopImmediatePropagation();
            e.preventDefault();
          }
        });
      }
    }
  }
]);
/**/
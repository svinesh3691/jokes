'use strict';

/* Controllers */

  // Form controller
app.controller('FormDemoCtrl', ['$scope', function($scope) {
    $scope.notBlackListed = function(value) {
      var blacklist = ['bad@domain.com','verybad@domain.com'];
      return blacklist.indexOf(value) === -1;
    }

    $scope.val = 15;
    var updateModel = function(val){
      $scope.$apply(function(){
        $scope.val = val;
      });
    };
    angular.element("#slider").on('slideStop', function(data){
      updateModel(data.value);
    });

    $scope.select2Number = [
      {text:'First',  value:'One'},
      {text:'Second', value:'Two'},
      {text:'Third',  value:'Three'}
    ];

    $scope.list_of_string = ['tag1', 'tag2']
    $scope.select2Options = {
        'multiple': true,
        'simple_tags': true,
        'tags': ['tag1', 'tag2', 'tag3', 'tag4']  // Can be empty list.
    };

    angular.element("#LinkInput").bind('click', function (event) {
      event.stopPropagation();
    });
}]);



// app.factory("services", ['$http', function($http) {

//     var serviceBase = 'http://localhost/ci_api/index.php/'
//     // var serviceBase = 'http://vintechnosys.com/iem/ci_api/index.php/'

//     var obj = {};



//     obj.master = function(func_name,post_data){
//         return $http.post(serviceBase + func_name, post_data);
//     }


//     obj.master_get = function(func_name,post_data){
//         return $http.get(serviceBase + func_name, post_data);
//     }


//     obj.sessn_data = function(){
//         return $http.post(serviceBase + 'cvin/sessn_ctrl');
//     }


//     obj.sessn_dstry = function(){
//         return $http.post(serviceBase + 'cvin/sessn_dstry');
//     }


//     return obj;   


// }]);


app.factory("services", ['$http', function($http) {

    // var serviceBase = 'http://localhost/ci_api/index.php/'
    var serviceBase = 'http://vintechnosys.com/iem/ci_api/index.php/'

    var obj = {};



    obj.master = function(func_name,post_data){
        return $http.post(serviceBase + func_name, post_data);
    }


    obj.master_get = function(func_name,post_data){
        return $http.get(serviceBase + func_name, post_data);
    }


    obj.sessn_data = function(){
        return $http.post(serviceBase + 'cvin/sessn_ctrl');
    }


    obj.sessn_dstry = function(){
        return $http.post(serviceBase + 'cvin/sessn_dstry');
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

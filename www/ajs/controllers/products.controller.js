'use strict';

/* Controllers */

//Controller to expense_type_add+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.controller('products', function ($scope, $rootScope, $location, $stateParams, services) {
     
      console.log('Products Controller!');
      $scope.id = $stateParams.Id;

      $scope.fils = {};
      $scope.fils.page          = 0;
      $scope.fils.count         = 3;
      $scope.fils.arraybrand = [];
      


      $scope.fils.arraysleeve     = [];
      $scope.fils.arrayfabric     = [];
      $scope.fils.arraytype       = [];
      $scope.fils.arraypattern    = [];
      $scope.fils.arrayoccasion   = [];
      $scope.fils.arraysize       = [];
      $scope.fils.arraystyle      = [];
      $scope.fils.arrayfit        = [];
      $scope.fils.arraypercent    = [];
      $scope.fils.arraycolor      = [];

      $scope.lists        = [];
      $scope.posts_loaded = [];
      $scope.shows        = true;
      $scope.nos          = false;

      services.master('app/productd/'+$scope.id).then(function(result){
                  $scope.results = result.data;
                  console.log($scope.results);
                  $scope.arraybrand_  = angular.copy($scope.fils.arraybrand); 
                  if($scope.results.brands) $scope.listbrand    = $scope.results.brands; else $scope.listbrand =false;
                  
                  $scope.arraysleeve_  = angular.copy($scope.fils.arraysleeve); 
                  if($scope.results.filters.tbuy_set_sleeve) $scope.listsleeve    = $scope.results.filters.tbuy_set_sleeve.options; else $scope.listsleeve =false;
                  $scope.arrayfabric_  = angular.copy($scope.fils.arrayfabric); 
                  if($scope.results.filters.tbuy_set_fabric) $scope.listfabric    = $scope.results.filters.tbuy_set_fabric.options; else $scope.listfabric =false;
                  $scope.arraytype_  = angular.copy($scope.fils.arraytype); 
                  if($scope.results.filters.tbuy_set_type) $scope.listtype    = $scope.results.filters.tbuy_set_type.options; else $scope.listtype = false;
                  $scope.arraypattern_  = angular.copy($scope.fils.arraypattern); 
                  if($scope.results.filters.tbuy_set_pattern) $scope.listpattern    = $scope.results.filters.tbuy_set_pattern.options; else $scope.listpattern =false;
                  $scope.arrayoccasion_  = angular.copy($scope.fils.arrayoccasion); 
                  if($scope.results.filters.tbuy_set_occasion) $scope.listoccasion    = $scope.results.filters.tbuy_set_occasion.options; else $scope.listoccasion =false;
                  $scope.arraysize_  = angular.copy($scope.fils.arraysize); 
                  if($scope.results.filters.tbuy_set_size) $scope.listsize    = $scope.results.filters.tbuy_set_size.options; else $scope.listsize =false;
                  $scope.arraystyle_  = angular.copy($scope.fils.arraystyle); 
                  if($scope.results.filters.tbuy_set_style)     $scope.liststyle    = $scope.results.filters.tbuy_set_style.options; else $scope.liststyle = false;
                  $scope.arrayfit_  = angular.copy($scope.fils.arrayfit); 
                  if($scope.results.filters.tbuy_set_fit)     $scope.listfit    = $scope.results.filters.tbuy_set_fit.options; else $scope.listfit = false;
                  $scope.arraypercent_  = angular.copy($scope.fils.arraypercent); 
                  if($scope.results.filters.tbuy_set_percent)     $scope.listpercent    = $scope.results.filters.tbuy_set_percent.options; else $scope.listpercent = false;
                  $scope.arraycolor_  = angular.copy($scope.fils.arraycolor); 
                  if($scope.results.filters.tbuy_set_color)     $scope.listcolor    = $scope.results.filters.tbuy_set_color.options; else $scope.listcolor = false;
                  
        });

        $scope.loadMore = function() {

                if($scope.shows==true)
                {
                      $scope.fils.page = parseFloat($scope.fils.page)+parseFloat(1);
                      services.master('app/products/'+$scope.id, $scope.fils).then(function(result){

                                      $scope.posts_loaded = result.data.products;
                                      if(result.data.products==false) 
                                      {
                                          $scope.shows=false;

                                      } else  $scope.lists = $scope.lists.concat($scope.posts_loaded);

                                                                 
                           });
                
                }else{
                        
                      console.log('Gaali');
                
                }
        
        };

       $scope.loadMore(); 

        $scope.filMore = function() {
                  
                  $scope.shows = true;
                  $scope.fils.page   = 0;
                  $scope.lists = [];
                  $scope.loadMore(); 
                  console.log('dd');
                  console.log($scope.fils);
        
        };


});


//Controller to expense_type_add+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.controller('product', function ($scope, $rootScope, $location, $stateParams, services) {
     
      console.log('Product Controller!');
      $scope.id = $stateParams.Id;

      services.master('app/produc/'+$scope.id ).then(function(result){

                    console.log('result.data');
                    console.log(result.data);
                    $scope.prod = result.data.products;
                    $scope.imgs = result.data.images;
                    
      });

      



})




//Controller to expense_type_add+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.controller('checkout', function ($scope, $rootScope, $location, $stateParams, services) {
     
      console.log('Checkout Controller !');
      // if($rootScope.authenticated)

      services.master('app/user_det').then(function(result){
                // console.log(result.data);
                $scope.reg = result.data[0];
      });

      $scope.checkout = function(dat) {
        if(!dat.copy)
        {
            dat.copy = false;
        }

        services.master('app/checkout',dat).then(function(result){
                console.log(result.data.msg);
                if(result.data == 1)
                {
                  $rootScope.hd_ct();
                  alert('Order Placed Successfully');
                  $location.path( "/my/orders" );
                   
                }
        });

      };
   



})



app.controller('sub_category_product',function($scope,webservices,pros,$route){

  console.log('sub_category_product...');


      this.sid = $route.current.params.sid;
      $scope.lists        = [];
      $scope.posts_loaded = [];
      $scope.shows        = true;
      $scope.nos          = false;
      $scope.url          = base_url;
      $scope.api          = api_url;



      $scope.para = {page: 1, count: 3, sid:this.sid};
      
      

                                
                                                       


                                $scope.loadMore = function() {

                                      if($scope.shows==true)
                                      {
                                            $scope.para.page = parseFloat($scope.para.page)+parseFloat(1);
                                            webservices.master('ngc_shop/allproducts',$scope.para).then(function(result){
                                                      
                                                                console.log(result.data.list);
                                                                $scope.posts_loaded = result.data.list;
                                                                if(result.data.list==false) 
                                                                {
                                                                    $scope.shows=false;
                                                                }
                                                                else
                                                                {  
                                                                    $scope.lists = $scope.lists.concat($scope.posts_loaded);
                                                                }
                                                       
                                                          

                                            });
                                      }
                                      else
                                      {
                                                  console.log('Gaali');
                                      }

                                };
    
     



});
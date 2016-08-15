'use strict';

/* Controllers */

//Controller home +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.controller('home', function ($scope, $rootScope, $location,$window,services,joks,yday,ledr,cats) {
    $scope.insdata = {};
    $scope.insdata.post_image = {};
    $scope.theUpddatas  ={};
    $scope.theUpddatas.post_data  ={};
    $scope.filt ={};
    $scope.filt.cat ="";
    /*Listing Section*/
    $scope.ydy = yday.data[0];
    $scope.ldr = ledr.data[0];
    $scope.cats = cats.data;

      //initially set those objects to null to avoid undefined error
      $scope.thedatas     = {};
      $scope.refList      = {};
      $scope.imag =  {};  
      $scope.imag.name =  {}; 
      $scope.over =  0; 
      $scope.insdata.post_cat = ""; 
      // $scope.show_over = "<i class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i>";
      $scope.show_over = "Loading Jokes...";
      $scope.postload  = false;

      //For Infos
      services.master('app/user').then(function(result){

        


            if(result.data.result) {

              $scope.mob_num =  result.data.result[0].user_mobile;


                if(result.data.result[0].user_mobile == "") {
                    if(!sessionStorage.sma) {
                        sessionStorage.sma = 1;
                        setTimeout(function(){
                          $scope.alt = confirm('Hi! We avail free recharges to our users. To know more about the recharge offer visit our about us page. Please update your mobile number in your profile to avail your free recharges !  \n\nNote: Your mobile number is not public to other users \n\nWould you like to update your mobile number now ?');
                          if($scope.alt) $location.path( "/app/profile" );
                          else return false;
                        },10000);
                    }
                    
                }
            }
      });





      //############################Fetching datas##################################//

          $scope.para = {page: 1, count: 4, filtcat: ""};
          $scope.jokes = [];

          $scope.joks = joks;
          $scope.posts_loaded = $scope.joks.data.result;
          if($scope.posts_loaded=="")
          {
              $scope.over=1;   
          }
          $scope.jokes = $scope.jokes.concat($scope.posts_loaded);
          emojify.run();

          $scope.loadMore = function() {
                    if($scope.over==0)
                    {
                        $scope.para.page = parseFloat($scope.para.page)+parseFloat(1);
                                         services.master('app/jokes',$scope.para).then(function(result){
                                        
                                         // node.master('app/jokes',$scope.para).then(function(result){
                                              $scope.posts_loaded = result.data.result;
                                              // console.log($scope.posts_loaded.length);
                                              if($scope.posts_loaded.length < 4)
                                              {
                                                  $scope.over=1;  
                                                  $scope.show_over = "Thats it! No More Jokes!";
                                              }
                                               $scope.jokes = $scope.jokes.concat($scope.posts_loaded);
                                               emojify.run();
                                        });
                    }
                    else
                    {
                      $scope.show_over = "Thats it! No More Jokes!";
                    }
            };

            $scope.loadMore();




            $scope.filt = function() {
              if($scope.filt.cat==undefined) $scope.filt.cat ="";

                    $scope.para.filtcat = $scope.filt.cat;
                    $scope.para.page = 0;

                    $scope.jokes = [];
                    $scope.over=0;
                    $scope.loadMore();
            };

            $scope.someFunction = function(jke){
                  $('#jke_'+jke).fadeOut("3210","swing");
                  setTimeout(function() {
                    $('#jke_'+jke).remove();
                    var index = $scope.jokes.indexOf(jke);
                    $scope.jokes.splice(index, 1);
                  }, 2500);
            };




      //***********************************************************Updating datas***********************************************************//
      $scope.subForm  = function (insdata) {
            $scope.postload  = true;

            if(jQuery.isEmptyObject($scope.uploads)==true && !insdata.post_text )
            {
               alert('Hey... You have neither choosen a image nor typed a joke. So what you want to post ? We are confused !!!');
               $scope.postload  = false;
               return false;
            }

            if(!insdata.post_cat)
            {
                alert('Hey... Your joke is really funny.. But can you please choose a category for your joke !!!');
                $scope.postload  = false;
               return false;
            }

            if(jQuery.isEmptyObject($scope.uploads)==false)
            {
                  var xhr = new XMLHttpRequest();
                  xhr.open('POST', api_site+'jokes/app/upload_file');
                  xhr.send($scope.uploads);

                  xhr.onload = function() {
                                  if (this.status == 200) {
                                        var resp = JSON.parse(this.response);
                                        insdata.post_image             = resp.file_name;
                                        $scope.theUpddatas.post_data   = insdata;
                                        services.master('app/insert',$scope.theUpddatas).then(function(result){

                                              $scope.uploads = {};
                                              $scope.over =  0; 

                                              $scope.jokes = [];
                                              $scope.para = {page: 0, count: 4,  filtcat: ""};
                                              $scope.insdata ={};
                                              document.getElementById('filer').value = '';
                                              $scope.postload  = false;
                                              alert('Joke Posted Succesfully');
                                              $scope.loadMore();

                                        });
                                  
                                  };
                  };


            }
            else
            {
                            insdata.post_image             = '';
                            $scope.theUpddatas.post_data   = insdata;
                            services.master('app/insert',$scope.theUpddatas).then(function(result){
                                  $scope.uploads = {};
                                  $scope.jokes = [];
                                  $scope.para = {page: 0, count: 4, filtcat: ""};
                                  $scope.over =  0; 
                                    
                                  $scope.insdata ={};
                                  $scope.postload  = false;


                                  alert('Joke Posted Succesfully');
                                  $scope.loadMore();
                            });

            }
      };
      //####################################################Updating datas#############################################################//



      //*******************************On change file*******************************//
      $scope.file_changed = function(element) {

          var photofile = element.files[0];
          var formData = new FormData();
          formData.append("upload", photofile);
          $scope.uploads = formData;
      };
      //###########################On change file##################################//




})




//Controller laughers +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.controller('laughers', function ($scope, $rootScope, $location,$window,services,joks) {
    // console.log('laughers controller welcomes you!');

    $scope.insdata = {};
    $scope.insdata.post_image = {};
    $scope.theUpddatas  ={};
    $scope.theUpddatas.post_data  ={};

    /*Listing Section*/


      //initially set those objects to null to avoid undefined error
      $scope.thedatas     = {};
      $scope.refList      = {};
      $scope.imag =  {};  
      $scope.imag.name =  {}; 
      $scope.over =  0; 
      // $scope.show_over = "<i class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i>";
      $scope.show_over = "Loading Jokes...";
      $scope.postload  = false;
      $scope.canload  = true;
      //############################Fetching datas##################################//
      

         



          
          $scope.para = {page: 1, count: 4};
          $scope.jokes = [];


          $scope.joks = joks;
          $scope.posts_loaded = $scope.joks.data.result;
          if($scope.posts_loaded=="")
          {
              $scope.over=1;   
          }
          $scope.jokes = $scope.jokes.concat($scope.posts_loaded);
          emojify.run();




          $scope.loadMore = function() {
              if($scope.canload)
              {
                      $scope.canload  = false;
                      if($scope.over==0)
                      {
                          $scope.para.page = parseFloat($scope.para.page)+parseFloat(1);
                                           services.master('app/laughers',$scope.para).then(function(result){
                                                $scope.posts_loaded = result.data.result;
                                                // console.log($scope.posts_loaded);
                                                if($scope.posts_loaded=="")
                                                {
                                                    $scope.over=1;   
                                                }
                                                 $scope.jokes = $scope.jokes.concat($scope.posts_loaded);
                                                 emojify.run();
                                                 $scope.canload  = true;

                                          });
                      }
                      else
                      {
                        $scope.show_over = "Thats it! No More Jokes!";
                      }
                }
              

            };

            $scope.loadMore();




})



//Controller fan_jokes +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.controller('fan_jokes', function ($scope, $rootScope, $location,$window,services,joks) {
    // console.log('fan_jokes controller welcomes you!');

    $scope.insdata = {};
    $scope.insdata.post_image = {};
    $scope.theUpddatas  ={};
    $scope.theUpddatas.post_data  ={};

    /*Listing Section*/


      //initially set those objects to null to avoid undefined error
      $scope.thedatas     = {};
      $scope.refList      = {};
      $scope.imag =  {};  
      $scope.imag.name =  {}; 
      $scope.over =  0; 
      // $scope.show_over = "<i class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i>";
      $scope.show_over = "Loading Jokes...";
      $scope.postload  = false;
      //############################Fetching datas##################################//
      

          
          $scope.para = {page: 1, count: 4};
          $scope.jokes = [];

          $scope.joks = joks;
          if($scope.joks.data.fan == false)
          {
              $scope.show_over = "Till now, you havent become fan to anyone ! If you want to become fan to some one just go to their profile and click become a fan and then their jokes will be displayed here";
              $scope.over=2;  
          }
          else
          {
              $scope.posts_loaded = $scope.joks.data.result;
          
              if($scope.posts_loaded=="")
              {
                  $scope.over=1;   
              }
              $scope.jokes = $scope.jokes.concat($scope.posts_loaded);
              emojify.run();
          }

          $scope.loadMore = function() {

                    if($scope.over==0)
                    {
                        $scope.para.page = parseFloat($scope.para.page)+parseFloat(1);
                                         services.master('app/fan_jokes',$scope.para).then(function(result){

                                              if(result.data.fan == false)
                                              {
                                                  $scope.show_over = "Till now, you havent become fan to anyone ! If you want to become fan to some one just go to their profile and click become a fan and then their jokes will be displayed here";
                                                  $scope.over=2;  
                                              }
                                              else
                                              {
                                                  $scope.posts_loaded = result.data.result;
                                              
                                                  if($scope.posts_loaded=="")
                                                  {
                                                      $scope.over=1;   
                                                  }
                                                  $scope.jokes = $scope.jokes.concat($scope.posts_loaded);
                                                  emojify.run();
                                              }
                                              
                                        });
                    }
                     else if($scope.over==2) 
                    {
                      $scope.show_over = "Till now, you havent become fan to anyone ! If you want to become fan to some one just go to their profile and click become a fan and then their jokes will be displayed here";
                    }
                    else
                    {
                      $scope.show_over = "Thats it! No More Jokes!";
                    }
            };

            $scope.loadMore();




})


//Controller profile +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.controller('profile', function ($scope, $rootScope, $location,services,joks,usrs,yday) {
    // console.log('Home controller welcomes you!');

    $scope.insdata = {};
    $scope.insdata.post_image = {};
    $scope.theUpddatas  ={};
    $scope.theUpddatas.post_data  ={};

    /*Listing Section*/

    $scope.ydy = yday.data[0];



    $scope.udt = usrs.data.result; 

    $scope.delt = function(d)
    {
          services.master('app/delt/'+d).then(function(result){
                    if(result.data == 1)
                    {
                        alert('Deleted Succesfully!');
                        document.getElementById(d).remove();
                    }
          });
    }

    $scope.pro = function(u)
    {
            services.master('app/up',u).then(function(result){
                if(result.data==1)
                {
                    alert('Update Succesfully!');
                }

            });
    }



      //initially set those objects to null to avoid undefined error
      $scope.thedatas     = {};
      $scope.refList      = {};
      $scope.imag =  {};  
      $scope.imag.name =  {}; 
      $scope.over =  0; 
      // $scope.show_over = "<i class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i>";
      $scope.show_over = "Loading Jokes...";
      //############################Fetching datas##################################//
      

          
          $scope.para = {page: 1, count: 4};
          $scope.jokes = [];

          $scope.joks = joks;
          $scope.posts_loaded = $scope.joks.data.result;
          if($scope.posts_loaded=="")
          {
              $scope.over=1;   
          }
          $scope.jokes = $scope.jokes.concat($scope.posts_loaded);
          emojify.run();



          $scope.loadMore = function() {


                    if($scope.over==0)
                    {
                        $scope.para.page = parseFloat($scope.para.page)+parseFloat(1);
                                         services.master('app/profile',$scope.para).then(function(result){
                                              $scope.posts_loaded = result.data.result;
                                              // console.log(result.data.result);
                                              if($scope.posts_loaded=="")
                                              {
                                                  $scope.over=1;   
                                              }
                                               $scope.jokes = $scope.jokes.concat($scope.posts_loaded);
                                               emojify.run();
                                        });
                    }
                    else
                    {
                      $scope.show_over = "Thats it! No More Jokes!";
                    }
            };

            $scope.loadMore();


})



//Controller profile +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.controller('profile_view', function ($scope, $rootScope, $location,services,$stateParams,joks,usrs) {
    // console.log('Profile view controller welcomes you!');

    $scope.insdata = {};
    $scope.insdata.post_image = {};
    $scope.theUpddatas  = {};
    $scope.theUpddatas.post_data = {};
    $scope.prid = $stateParams.Id;


           $scope.fanc = function(p)
                  {
                        $rootScope.para = {};
                        $rootScope.para = {fan_pid: p};
                        services.master('app/fanc',$rootScope.para).then(function(result){
                        });  
                  }

                  $scope.fanx =  function(p)
                  {
                        $rootScope.para = {};
                        $rootScope.para = {fan_pid: p};
                        services.master('app/fanx',$rootScope.para).then(function(result){
                        });  
                  }


              // services.master('app/user_details/'+$scope.prid).then(function(result){
              //           $scope.ud = result.data.result;
              //             console.log($scope.ud);
              //  });
              $scope.ud = usrs.data.result;

    /*Listing Section*/


      //initially set those objects to null to avoid undefined error
      $scope.thedatas     = {};
      $scope.refList      = {};
      $scope.imag =  {};  
      $scope.imag.name =  {}; 
      $scope.over =  0; 
      // $scope.show_over = "<i class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i>";
      $scope.show_over = "Loading Jokes...";
      //############################Fetching datas##################################//
      

          
          $scope.para = {page: 1, count: 4};
          $scope.jokes = [];


          $scope.joks = joks;
          $scope.posts_loaded = $scope.joks.data.result;
          if($scope.posts_loaded=="")
          {
              $scope.over=1;   
          }
          $scope.jokes = $scope.jokes.concat($scope.posts_loaded);
          emojify.run();






          $scope.loadMore = function() {


                    if($scope.over==0)
                    {
                        $scope.para.page = parseFloat($scope.para.page)+parseFloat(1);
                                         services.master('app/profile_view/'+$scope.prid,$scope.para).then(function(result){
                                              $scope.posts_loaded = result.data.result;
                                              // console.log(result.data.result);
                                              if($scope.posts_loaded=="")
                                              {
                                                  $scope.over=1;   
                                              }
                                               $scope.jokes = $scope.jokes.concat($scope.posts_loaded);
                                               emojify.run();
                                        });
                    }
                    else
                    {
                      $scope.show_over = "Thats it! No More Jokes!";
                    }
            };

            $scope.loadMore();




})


//Controller app +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.controller('joke', function ($scope, $rootScope, $location,services,$stateParams,jok) {

      $rootScope.met = $stateParams.Id;
      
      
     //  services.master('app/joke/'+$scope.prid).then(function(result){
     //          $scope.joke = result.data.result;
     //            console.log($scope.joke);
                                            
     // });
      // $rootScope.met = true;
      $rootScope.joker = jok.data.result;
  
    
})




//Controller app +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.controller('edit', function ($scope, $rootScope, $location,services,$stateParams,joks,cats) {

      
    $scope.insdata = {};
    $scope.insdata.post_image = {};
    $scope.theUpddatas  ={};
    $scope.theUpddatas.post_data  ={};


        $scope.cats = cats.data;


    /*Listing Section*/


      //initially set those objects to null to avoid undefined error
      $scope.thedatas     = {};
      $scope.refList      = {};
      $scope.imag =  {};  
      $scope.imag.name =  {}; 
      $scope.over =  0; 
      // $scope.show_over = "<i class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i>";
      $scope.show_over = "Loading Jokes...";
      $scope.postload  = false;
      //############################Fetching datas##################################//
      

    
      //############################Fetching datas##################################//




      $scope.prid = $stateParams.Id;

      $scope.joke = joks.data.result;
      $scope.insdata.post_text = joks.data.result[0].post_text;
      $scope.insdata.post_cat  = joks.data.result[0].post_cat; 
      // console.log($scope.insdata.post_cat);


      //***********************************************************Updating datas***********************************************************//
      $scope.subForm  = function (insdata) {
            $scope.postload  = true;

            if(jQuery.isEmptyObject($scope.uploads)==false)
            {
                  var xhr = new XMLHttpRequest();
                  xhr.open('POST', api_site+'jokes/app/upload_file');
                  xhr.send($scope.uploads);

                  xhr.onload = function() {
                                  if (this.status == 200) {
                                        var resp = JSON.parse(this.response);
                                        insdata.post_image             = resp.file_name;
                                        $scope.theUpddatas.post_data   = insdata;
                                        services.master('app/update/'+$scope.prid,$scope.theUpddatas).then(function(result){

                                              alert('Joke Updated Succesfully');
                                                window.location.reload();
                                        });
                                  
                                  };
                  };


            }
            else
            {
                            insdata.post_image             = '';
                            $scope.theUpddatas.post_data   = insdata;
                            // console.log($scope.theUpddatas.post_data);
                            services.master('app/update/'+$scope.prid ,$scope.theUpddatas).then(function(result){
                                  alert('Joke Updated Succesfully');
                                  window.location.reload();
                            });

            }
      };
      //####################################################Updating datas#############################################################//

      //*******************************On change file*******************************//
      $scope.file_changed = function(element) {
          var photofile = element.files[0];
          var formData = new FormData();
          formData.append("upload", photofile);
          $scope.uploads = formData;
      };
      //###########################On change file##################################//









    
})






//Controller app +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.controller('app', function ($scope, $rootScope, $location,services) {
    // console.log('App controller welcomes you!');
    
})








// app.controller('joke', function ($scope, $rootScope, $location,services){
//     // console.log('Joke controller welcomes you!');

// })





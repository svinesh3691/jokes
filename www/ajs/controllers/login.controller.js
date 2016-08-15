'use strict';

/* Controllers */

//Controller home +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.controller('login', function ($scope, $rootScope, $location,services,$localStorage,node) {
    // console.log('Login controller welcomes you!');
    $scope.login = function(dat) {
      	services.master('app/login',dat).then(function(result){
                // console.log(result.data.msg);
                if(result.data.status == 1)
                {
                	// alert('Hi! '+result.data.name+'. You have sucessfully logged in');
                         $location.path( "/app/home" );
                }else alert('The username/password you entered is wrong. Please try again');
    	});

    };

});



app.controller('register', function ($scope, $rootScope, $location,services) {
     
    // console.log('Register controller welcomes you!');

    $scope.register = function(dat) {
      	services.master('app/register',dat).then(function(result){
                // console.log(result.data.msg);
                if(result.data.status == 1)
                {
                	alert('Hi! '+result.data.name+'. Your account is sucessfully created');
                	// window.location = "index.html";
                	$location.path( "/app/home" );
                }
                else if(result.data.status == 2)
                {
                    alert('Oops! The mail id '+result.data.name+' is already registered with us ');
                    $('.rin').html('Register with appsvin.com');
                }
                
    	});

    };


});




app.controller('forgot_password', function ($scope, $rootScope, $location,services) {
     
    // console.log('Register controller welcomes you!');

    $scope.process = function(dat) {
        services.master('app/forgot_password',dat).then(function(result){
                // console.log(result.data.msg);
                if(result.data.status == 1)
                {
                    alert('Hi! '+result.data.name+'. Your password is sent to your mail - '+result.data.mail+'');
                    // window.location = "index.html";
                    $location.path( "/app/login" );
                }
                else if(result.data.status == 2)
                {
                    alert('Oops! The mail id '+result.data.name+' is not registered with us ');
                    $('.lint').html('Request Password');
                }

                else if(result.data.status == 0)
                {
                    alert('Sorry! '+result.data.name+' Something went wrong. Please Try again later! ');
                    $('.lint').html('Request Password');
                }

                
        });

    };


});




//Controller app +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.controller('change_password', function ($scope, $rootScope, $location,services) {
    // console.log('App controller welcomes you!');


        $scope.change = function(dat) {
        services.master('app/change_password',dat).then(function(result){
                // console.log(result.data.msg);
                if(result.data.status == 1)
                {
                    alert('Your Password is changed sucessfully');
                    $location.path( "/app/profile" );
                }
                else if(result.data.status == 2)
                {
                    alert('Oops! The old password you entered is wrong');
                    $('.rin').html('Change Password');
                    $('#old').val('');
                }
                
        });

    };


      
})













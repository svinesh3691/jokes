$('document').ready(function(){
	slide = false;

	$('.mo').click(function(){
		// alert();
		$('.sidemenu').css('display','block');
		$('.ov').css('display','block');
		slide = true;


	});	
	$('.om').click(function(){
		// alert();
		$('.sidemenu').css('display','none');
		$('.ov').css('display','none');

	slide = false;

	});	


	$(document).click(function(e) {
        if ($(e.target).is('.mo')) {
            return;
        }
        else if ($(e.target).is('.uls')) {
            return;
        }
         else if ($(e.target).is('.sm-header,.sm-header *')) {
            return;
        }
        if(slide){
            	$('.sidemenu').css('display','none');
		$('.ov').css('display','none');

				slide = false;
        }
    });

	

	$('.smg').click(function(){
		$('.sem ul').toggleClass('enl');


	});


	$('.sem ul').click(function(){

		$('.sem ul').toggleClass('enl');
	});






});
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





	$(document).ready(function(){
		resetcss();

	});

	$(window).resize(function(){
		resetcss();
	});


	// Profile css
	function resetcss()
	{

		ww = $(window).width();
		pw = $('.profile-parent').width();	
		hh = $('header').height();
		if(ww < 980)
		{
			$('.profile').css({'display' : 'none' });
		} 
		else
		{
			$('.profile').css({
				'width'   : pw,
				'top'     : hh+27,
				'display' : 'block',
			});	

		}

		$('.jokes').css({
				'top'     : hh,
		});	
	}

	


	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
	
	//Click event to scroll to top
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});




	   $(document).on("click", '.whatsapp', function (e) {

	   		e.preventDefault();
	        var sText = $(this).attr('msg');

	        var sUrl = "http://jokes.appsvin.com/";

	        var sMsg = encodeURIComponent(sText) + "%0D%0A %0D%0A - see more at %0D%0A  " + encodeURIComponent(sUrl);

	        var whatsapp_url = "whatsapp://send?text=" + sMsg;

	        window.location.href = whatsapp_url;

	  });




	   $(document).on('click','.emo img',function(){
					text = $(this).attr('title');
				      var txtarea = document.getElementById("pj");
				      var scrollPos = txtarea.scrollTop;
				      var strPos = 0;
				      var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
				            "ff" : (document.selection ? "ie" : false ) );
				      if (br == "ie") { 
				            txtarea.focus();
				            var range = document.selection.createRange();
				            range.moveStart ('character', -txtarea.value.length);
				            strPos = range.text.length;
				      }
				      else if (br == "ff") strPos = txtarea.selectionStart;
				      var front = (txtarea.value).substring(0,strPos);  
				      var back = (txtarea.value).substring(strPos,txtarea.value.length); 
				      txtarea.value=front+text+back;
				      strPos = strPos + text.length;
				      if (br == "ie") { 
				            txtarea.focus();
				            var range = document.selection.createRange();
				            range.moveStart ('character', -txtarea.value.length);
				            range.moveStart ('character', strPos);
				            range.moveEnd ('character', 0);
				            range.select();
				      }
				      else if (br == "ff") {
				            txtarea.selectionStart = strPos;
				            txtarea.selectionEnd = strPos;
				            txtarea.focus();
				      }
				      txtarea.scrollTop = scrollPos;
				      $('#pj').trigger('input');
				});




});
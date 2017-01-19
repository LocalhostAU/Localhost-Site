// This is where it all goes :)
$(window).scroll(function(){
	$introHeight = $('header').height() * 2;
	$scrolled = $(window).scrollTop();

	//$("header .logo").css("opacity", 1 - $scrolled / $introHeight);
	$("header .logo").css("top", -($scrolled * 0.25));
	$(".event-bits #bit-blue").css("top", -($scrolled * 0.04));
	$(".event-bits #bit-green").css("top", -($scrolled * 0.035));
	$(".event-bits #bit-purple").css("top", -($scrolled * 0.025));
	//$(".date .month").css("margin-bottom", (60 + ($scrolled * 0.035)));
	//$(".date .day").css("top", (-($scrolled * 0.05)));
	//$(".date .weekday").css("top", (-($scrolled * 0.05)));
	//$("#mc_embed_signup").css("padding-top", (0 + ($scrolled * 0.05)));

	if ($scrolled >= $introHeight) {
		//$('#header').addClass('sm-nav');
	} else if ($scrolled < $introHeight) {
		//$('#header').removeClass('sm-nav');
	}
});

$(document).ready(function(){
  $('section.mission').bind('inview', function (event, visible) {
    //$this = $(this);
    if (visible == true) {
      // element is now visible in the viewport
     $('section.mission').removeClass('inview');
        alert('found h2!');
    } else {
      // element has gone out of viewport
       $('section.mission').addClass('inview');
    }
  });


});

$(function() {
  if ($('.mission').is(':visible')) {
    //$('.mission').addClass('red');
  }
});
$(window).on('scroll', function() {
  var $elem = $('.mission');
  var $window = $(window);

  var docViewTop = $window.scrollTop();
  var docViewBottom = docViewTop + $window.height();
  var elemTop = (($elem.offset().top) - ($window.height()/2));
  var elemBottom = elemTop + $elem.height();

  if (elemTop <= docViewTop) {
      //alert('hi');
      $('.mission').addClass('inview');
  }
});

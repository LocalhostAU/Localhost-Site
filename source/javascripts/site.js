// This is where it all goes :)
$(window).scroll(function(){
	$introHeight = $('header').height() * 2;
	$scrolled = $(window).scrollTop();

	//$("header .logo").css("opacity", 1 - $scrolled / $introHeight);
	$("header .logo").css("top", -($scrolled * 0.25));

	if ($scrolled >= $introHeight) {
		//$('#header').addClass('sm-nav');
	} else if ($scrolled < $introHeight) {
		//$('#header').removeClass('sm-nav');
	}
});

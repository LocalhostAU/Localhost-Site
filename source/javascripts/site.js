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

$(window).on('scroll', function() {
  var $elem = $('.mission');

  if ($elem.length) {
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();
    var elemTop = (($elem.offset().top) - ($window.height()/2));
    var elemBottom = elemTop + $elem.height();

    if (elemTop <= docViewTop) {
      $('.mission').addClass('inview');
    }
  }
});




TweenLite.set('.block', { css: { visibility:"visible", scale: 0, transformOrigin: "50% 50%", left:0, bottom:0 } });


animateInit.staggerTo(".block", 1, {ease: Elastic.easeOut.config(1, 0.3), scale:1, transformOrigin:"50% 50%"}, 0.125)
  .staggerTo(".block", 1, {ease: Elastic.easeIn.config(1, 0.3), scale:0, transformOrigin:"50% 50%"}, 0.125);

animateOn.staggerTo(".block", 1, {ease: Elastic.easeOut.config(1, 0.3), scale:1, transformOrigin:"50% 50%"}, 0.125);

$('.logo a').on('mouseover focus',function(){

	if(animateInit.progress() === 1){
		animateOn.play();
	}
});

$('.logo a').on('mouseout focusout',function(){
	if(animateInit.progress() === 1){
		animateOn.reverse();
	}
});


$(".line-12").on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(e){
    animateInit.play();
 });

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


var animateInit = new TimelineMax({paused:true}),
	animateOn = new TimelineMax({paused:true});

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

$(".calendar-toggles .city-perth").change(function() {
  $('.calendar').toggleClass('toggle-per');
});

$(".calendar-toggles .city-sydney").change(function() {
  $('.calendar').toggleClass('toggle-syd');
});

$(".calendar-toggles .city-melbourne").change(function() {
  $('.calendar').toggleClass('toggle-mel');
});

$(".calendar-toggles .city-brisbane").change(function() {
  $('.calendar').toggleClass('toggle-bne');
});

$(".calendar-toggles .city-other").change(function() {
  $('.calendar').toggleClass('toggle-other');
});

$(function() {
    var tabs = $(".calendar-future-events");

    // For each individual tab DIV, set class and aria-hidden attribute, and hide it
    $(tabs).find("main .calendar div").attr({
        "class": "tabPanel",
        "aria-hidden": "true"
    }).addClass("hidden");

    // Get the list of tab links
    var tabsList = tabs.find("nav ul:first").attr({
        "class": "tabsList",
    });

    // For each item in the tabs list...
    $(tabsList).find("li > a").each(
        function(a){
            var tab = $(this);

            // Create a unique id using the tab link's href
            var tabId = "tab-" + tab.attr("href").slice(1);

            // Assign tab id and aria-selected attribute to the tab control, but do not remove the href
            tab.attr({
                "id": tabId,
                "aria-selected": "false",
            }).parent().attr("role", "presentation");

            // Assign aria attribute to the relevant tab panel
            $(tabs).find(".tabPanel").eq(a).attr("aria-labelledby", tabId);

            // Set the click event for each tab link
            tab.click(
                function(e){
                    var tabPanel;

                    // Prevent default click event
                    e.preventDefault();
                    //window.location.hash = $(this).attr('href');

                    // Change state of previously selected tabList item
                    $(tabsList).find("> li.current").removeClass("current").find("> a").attr("aria-selected", "false");

                    // Hide previously selected tabPanel
                    $(tabs).find(".tabPanel:visible").attr("aria-hidden", "true").stop().addClass("hidden");;

                    // Show newly selected tabPanel
                    tabPanel = $(tabs).find(".tabPanel").eq(tab.parent().index());
                    tabPanel.attr("aria-hidden", "false").stop().removeClass("hidden").addClass("animated fadeInUp");

                    // Set state of newly selected tab list item
                    tab.attr("aria-selected", "true").parent().addClass("current");

                    // Set focus to the first heading in the newly revealed tab content
                    tabPanel.children("h2").attr("tabindex", -1).focus();
                }
            );
        }
    );

    // Set keydown events on tabList item for navigating tabs
    $(tabsList).delegate("a", "keydown",
        function (e) {
            var tab = $(this);
            switch (e.which) {
                case 37: case 38:
                    if (tab.parent().prev().length!=0) {
                        tab.parent().prev().find("> a").click();
                    } else {
                        $(tabsList).find("li:last > a").click();
                    }
                    break;
                case 39: case 40:
                    if (tab.parent().next().length!=0) {
                        tab.parent().next().find("> a").click();
                    } else {
                        $(tabsList).find("li:first > a").click();
                    }
                    break;
            }
        }
    );


    var d = new Date();
    var n = d.getMonth() + 1;

    // Show the first tabPanel
    $(tabs).find(".tabPanel:nth-child(" + n + ")").attr("aria-hidden", "false").removeClass("hidden").addClass("animated fadeInUp");

    // Set state for the first tabsList li
    $(tabsList).find("li:nth-child(" + n + ")").addClass("current").find(" > a").attr({
        "aria-selected": "true",
        "tabindex": "0"
    });
});

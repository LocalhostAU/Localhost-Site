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
    }).hide();

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

                    // Change state of previously selected tabList item
                    $(tabsList).find("> li.current").removeClass("current").find("> a").attr("aria-selected", "false");

                    // Hide previously selected tabPanel
                    $(tabs).find(".tabPanel:visible").attr("aria-hidden", "true").stop().hide();

                    // Show newly selected tabPanel
                    tabPanel = $(tabs).find(".tabPanel").eq(tab.parent().index());
                    tabPanel.attr("aria-hidden", "false").stop().fadeIn();

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
    $(tabs).find(".tabPanel:nth-child(" + n + ")").attr("aria-hidden", "false").fadeIn();

    // Set state for the first tabsList li
    $(tabsList).find("li:nth-child(" + n + ")").addClass("current").find(" > a").attr({
        "aria-selected": "true",
        "tabindex": "0"
    });
});

var spreadsheetID = "1bsJUvCxn7LfBvLuktxhJzd96cA8sY8iRLbl9KE6hwzI";

// Make sure it is public or set to Anyone with link can view
var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

$.getJSON(url, function(data) {
 var entry = data.feed.entry;
 if(entry) {
   var newmonth = null;
   $(entry).each(function(i){
     var month = this.gsx$month.$t;
     if(month != newmonth | i == 0) {
       $('.calendar').append('<div style="display:none"  class="tabPanel tab-'+month.toLowerCase()+'" aria-hidden="true" aria-labelledby="tab-'+month.toLowerCase()+'"><h2 id="'+month+'">'+month+'</h2><ul class='+month.toLowerCase()+'>')
     }
     $('.calendar .'+month.toLowerCase()+'').append('<li class="'+this.gsx$location.$t.toLowerCase()+'-event past-event"><a href="'+this.gsx$link.$t+'" target="_blank"><span class="calendar-event-date calendar-past-date">'+this.gsx$date.$t+'</span><span class="calendar-event-details"><span>'+this.gsx$title.$t+'</span><span>'+this.gsx$type.$t+'</span><span>'+this.gsx$location.$t+'</span><span class="calendar-event-link"><svg width="15px" height="14px" viewBox="1309 2041 15 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g transform="translate(1309.000000, 2042.000000)"><rect stroke-width="1" fill="none" stroke="#000000" x="0" y="3" width="11" height="10"></rect><path d="M4.5,8.5 L11.5,2.5" id="Line" stroke="#4A4A4A" stroke-linecap="square"></path><path d="M12.5,1.5 L10.5,1.5" id="Line" stroke="#4A4A4A" stroke-linecap="square"></path><path d="M12.5,2.5 L12.5,3.5" id="Line" stroke="#4A4A4A" stroke-linecap="square"></path></g></svg></span></span></a></li>');
     newmonth = this.gsx$month.$t;
     if(month != newmonth) {
       $('.calendar').append('</ul></div>')
     }
   });
 }
}).done(function() {
  var d = new Date();
  var monthNames = ["jan", "feb", "mar", "apr", "may", "jun",
"jul", "aug", "sep", "oct", "nov", "dec"
];
  var currentMonth = monthNames[d.getMonth()];
  $('div.tab-'+currentMonth).show();
  });

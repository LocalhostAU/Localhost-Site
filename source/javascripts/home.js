//next Events Feed.
// ID of the Google Spreadsheet
// Live
var featuredspreadsheetID = "1tTuj1ptQhBimlp5p3AKyBtPavAKofGxn-3yMhhytv9E";
// Dev
//var featuredspreadsheetID = "1bsJUvCxn7LfBvLuktxhJzd96cA8sY8iRLbl9KE6hwzI";

// Make sure it is public or set to Anyone with link can view
var featuredurl = "https://spreadsheets.google.com/feeds/list/" + featuredspreadsheetID + "/2/public/values?alt=json";
$.getJSON(featuredurl, function(data) {
  var featuredentry = data.feed.entry;
  $(featuredentry).each(function(i){
    if( i == 0) {
      $('.localhost-upcoming-event > .container-fluid').append('<p class="date"><span class="weekday">'+this.gsx$day.$t+' '+this.gsx$date.$t+'</span><span class="month">'+this.gsx$month.$t+'</span></p>');
    }

    $('.localhost-upcoming-event > .container-fluid').append('<div class="localhost-event"><h2 class="title">  <a href="'+this.gsx$link.$t+'" title="Find out about '+this.gsx$title.$t+'" target="_blank"><span data-hover="'+this.gsx$title.$t+'">'+this.gsx$title.$t+'</span></a></h2><p class="speaker">'+this.gsx$speaker.$t+' <span class="from">'+this.gsx$speakerfrom.$t+'</span></p> <p class="location"><span>'+this.gsx$location.$t+'</span></p></div>');
  });
});


//Homepage Events Feed.
// ID of the Google Spreadsheet
// Live
var spreadsheetID = "1tTuj1ptQhBimlp5p3AKyBtPavAKofGxn-3yMhhytv9E";
// Dev
//var spreadsheetID = "1bsJUvCxn7LfBvLuktxhJzd96cA8sY8iRLbl9KE6hwzI";

// Make sure it is public or set to Anyone with link can view
var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

$.getJSON(url, function(data) {
  var entry = data.feed.entry;
  if(entry) {
    var newmonth = null;
    var i=1;
    $(entry).each(function(){
      if(!moment(this.gsx$startdate.$t+"-"+this.gsx$month.$t+"-"+this.gsx$year.$t, "DD-MM-YYYY").isSameOrAfter(new Date().setHours(0, 0, 0, 0))){
        if(moment(this.gsx$enddate.$t+"-"+this.gsx$month.$t+"-"+this.gsx$year.$t, "DD-MM-YYYY").isSameOrAfter(new Date().setHours(0, 0, 0, 0))){
         var statusClass = "upcoming-event";
        } else {
         var statusClass = "past-event";

        }
       } else {
         var statusClass = "upcoming-event";
       }


      if(this.gsx$localhostevent.$t == "1"){
        var featuredClass = "featured-event";
      } else {
        var featuredClass = "";
      }

      if(statusClass == "upcoming-event"){
        if(i>10) return false;
        var month = this.gsx$month.$t;
        if(month != newmonth | i == 0) {
          $('.future-events ul').append('<li class="date-title"><p class="date month">'+moment(this.gsx$startdate.$t+"-"+this.gsx$month.$t+"-"+this.gsx$year.$t, "DD-MM-YYYY").format("MMMM")+'</p></li>');
        }

        var $locationEvent = this.gsx$location.$t.toLowerCase();
        if ($locationEvent !== 'per' && $locationEvent !== 'mel' && $locationEvent !== 'bne' && $locationEvent !== 'syd' ){
          $locationEvent = 'other';
        }

        var endDate = "";
        if(this.gsx$enddate.$t){
          var endDate = " - "+moment(this.gsx$enddate.$t+"-"+this.gsx$month.$t+"-"+this.gsx$year.$t, "DD-MM-YYYY").format("ddd DD");
        }

        //console.log(moment(this.gsx$enddate.$t+"-"+this.gsx$month.$t+"-"+this.gsx$year.$t, "DD-MM-YYYY").isSameOrAfter(new Date()));
        //$('.future-events ul').append('<span class="calendar-event-details"><span>'+this.gsx$title.$t+'</span><span>'+this.gsx$type.$t+'</span><span>'+this.gsx$location.$t+'</span></a></li>');
      $('.future-events ul').append('<li class="'+$locationEvent+'-event '+statusClass+' '+featuredClass+'">\
        <a href="'+this.gsx$link.$t+'" class="title" target="_blank">\
          <span class="calendar-event-date calendar-past-date">'+ moment(this.gsx$startdate.$t+"-"+this.gsx$month.$t+"-"+this.gsx$year.$t, "DD-MM-YYYY").format("ddd DD")+endDate+'</span>\
          <span class="title"><span class="event-title">'+this.gsx$title.$t+'</span><span class="event-type">'+this.gsx$type.$t+'</span><span class="location">'+this.gsx$location.$t+'</span></span>\
        </a>\
      </li>');
      newmonth = this.gsx$month.$t;
      i++;
    }
  });

}
});

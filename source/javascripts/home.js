//next Events Feed.
 // ID of the Google Spreadsheet
 var featuredspreadsheetID = "1tTuj1ptQhBimlp5p3AKyBtPavAKofGxn-3yMhhytv9E";
 // Make sure it is public or set to Anyone with link can view
 var featuredurl = "https://spreadsheets.google.com/feeds/list/" + featuredspreadsheetID + "/2/public/values?alt=json";
 $.getJSON(featuredurl, function(data) {
  var featuredentry = data.feed.entry;
  $(featuredentry).each(function(){
    // Column names are name, age, etc.
    $('.upcoming-event').append('<p class="date"><span class="title">Calendar</span> <span class="weekday">'+this.gsx$day.$t+' '+this.gsx$date.$t+'</span><span class="month">'+this.gsx$month.$t+'</span></p><h2 class="title">  <a href="'+this.gsx$link.$t+'" title="Find out about '+this.gsx$title.$t+'" target="_blank"><span data-hover="'+this.gsx$title.$t+'">'+this.gsx$title.$t+'</span></a></h2><p class="speaker">'+this.gsx$speaker.$t+' <span class="from">'+this.gsx$speakerfrom.$t+'</span></p> <p class="location">'+this.gsx$location.$t+'</p>');
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
    $('.future-events').prepend('<p class="date"><span class="weekday">Coming Up</span></p>');
    var newmonth = null;
    var i=1;
    $(entry).each(function(){
      if(moment(this.gsx$startdate.$t+"-"+this.gsx$month.$t+"-"+this.gsx$year.$t, "DD-MM-YYYY").isSameOrAfter(new Date().setHours(0, 0, 0, 0))){
        if(i>10) return false;
        var month = this.gsx$month.$t;
        if(month != newmonth | i == 0) {
          $('.future-events ul').append('<li class="date-title"><p class="date month">'+moment(this.gsx$startdate.$t+"-"+this.gsx$month.$t+"-"+this.gsx$year.$t, "DD-MM-YYYY").format("MMM")+'</p></li>');
        }
        var endDate = "";
        if(this.gsx$enddate.$t){
          var endDate = " - "+moment(this.gsx$enddate.$t+"-"+this.gsx$month.$t+"-"+this.gsx$year.$t, "DD-MM-YYYY").format("ddd DD");
        }
        //console.log(moment(this.gsx$enddate.$t+"-"+this.gsx$month.$t+"-"+this.gsx$year.$t, "DD-MM-YYYY").isSameOrAfter(new Date()));
        $('.future-events ul').append('<li>\
          <a href="'+this.gsx$link.$t+'" class="title" target="_blank">\
            <span class="date">'+ moment(this.gsx$startdate.$t+"-"+this.gsx$month.$t+"-"+this.gsx$year.$t, "DD-MM-YYYY").format("ddd DD")+endDate+'</span>\
            <span class="title">'+this.gsx$title.$t+' <span class="location">('+this.gsx$location.$t+')</span></span>\
          </a>\
        </li>');
        newmonth = this.gsx$month.$t;
        i++;
      }
    });
    $('.future-events ul').append('<li><a href="/events/" class="title"><span class="title">View more events</span></a></li>');

  }
 });

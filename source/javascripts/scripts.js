// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$(function() {

  // Convert unix timestamp
  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp*1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    // Customize the returned date
    var time = month + ' ' + date + ',' + year;
    return time;
  }

  // The initial request URL
  var reqURL = "https://api.instagram.com/v1/users/14989250/media/recent/?access_token=14989250.a1982d7.a9539f2ed5744019b8bcf46a876152df";

  // Retreives photos from Instagram
  function loadInsta(reqURL) {
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: false,
        url: reqURL,
        success: function(data) {

          //console.log(data);

          // Get the amount of photos in the object
          var count = data.data.length;

          // Loop through the photos
          for (var i = 0; i < count; i++) {

            // Google static map api
            var map = 'http://maps.googleapis.com/maps/api/staticmap?' +
                      'center=' + data.data[i].location.latitude + ',' + data.data[i].location.longitude + '&' +
                      'zoom=13&' +
                      'size=612x100&' +
                      // Cant get custom icon to work. Fix this first
                      'markers=icon:http://i.imgur.com/QbSul.png%7Cshadow:false%7C' + data.data[i].location.latitude + ',' + data.data[i].location.longitude + '&' +
                      'sensor=true';

            // Photo Link
            var photoLink = data.data[i].link || null;

            // Photo src
            var img = data.data[i].images.standard_resolution.url || null;

            // Photo caption
            var caption = null;
            if (data.data[i].caption) {
              caption = data.data[i].caption.text;
            } else {
              caption = "";
            }

            // Name of location
            var locationName = null;
            if (data.data[i].location.name) {
              locationName = data.data[i].location.name;
              locationName = "<span class='location'> &nbsp;&mdash;&nbsp; " + locationName + "&nbsp; / </span>";
            } else {
              locationName = "";
            }

            // Date posted
            var datePosted = timeConverter(data.data[i].created_time);
            datePosted = "<span class='date'>" + datePosted + "</span> ";
            
            $(".pics").append(
              "<li class='group'>" +
                "<div class='image'>" +
                  "<a target='_blank' href='" + photoLink + "'>" +
                    "<img src='" + img + "' />" +
                  "</a>" +
                "</div>" +
                "<div class='meta'>" +
                  "<img class='face-map' src='" + map + "' />" +
                  "<div class='info'>" +
                    caption + locationName + " &nbsp;" + datePosted +
                  "</div>" +
                "</div>" +
              "</li>"
              );
          }

          // Get url to load more photos
          window.nextPage = data.pagination.next_url;

          $('.load-more').html('Load More');

          if ($('li').length > 0){
            $('.first-load').hide();
          }

        }
    });
  }

  // Load most recent photos
  loadInsta(reqURL);

  // Load more button
  $('.load-more').click(function(){
    console.log('next page: ' + nextPage);
    $(this).html('<img src="images/ajax-loader.gif" />');
    loadInsta(nextPage);

    return false;

  });

  // Scroll back to top button
  $(".scroll-top").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  // Global vars
  var mastHeight = 526;
  var mastheadWrap = $('.header .logo');
  var animSpeed = 10;
  var ua = navigator.userAgent;
  var uaCheck = {
    ios:        ua.match(/(iPhone|iPod|iPad)/),
    blackberry: ua.match(/BlackBerry/),
    android:    ua.match(/Android/)
  };

  // Parallax scrolling/opacity transition for the header
  function fancyHeader(){
      // define some globals for our methods to hit
      var scrollDist = $(window).scrollTop(),
      docH = $(document).height(),
      opacityNum = 1 - (scrollDist * (1/100)),
      positionNum = 150 - Math.floor(scrollDist * 1);
    
      // moving the header around
      if (positionNum <= mastHeight) {
        mastheadWrap.css({
          'padding' : positionNum + 'px 0'
        });
      }

      // fading master wrap
      if (opacityNum > 1) {
        opacityNum = 1;
      }
      if (opacityNum <= 1 && opacityNum >= 0) {
        mastheadWrap.css('opacity', opacityNum);
      }
    }


  $(window).scroll(function () {

    // we dont care about this stuff on mobile devices
    if (uaCheck.ios || uaCheck.blackberry || uaCheck.android) return;

    // Call fancy header
    fancyHeader();

    // Show scroll top button after user starts to scroll
    var fromTop = $(window).scrollTop();
    if (fromTop > 1000) {
      $(".scroll-top").fadeIn(300);
    } else {
      $(".scroll-top").fadeOut(300);
    }

    // $('.meta:in-viewport').animate({
    //   marginTop : "-6px",
    //   opacity : "1"
    // }, 350);
  });
});
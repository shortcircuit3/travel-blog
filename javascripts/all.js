$(function(){function e(e){var t=new Date(e*1e3),n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],r=t.getFullYear(),i=n[t.getMonth()],s=t.getDate(),o=t.getHours(),u=t.getMinutes(),a=t.getSeconds(),f=i+" "+s+","+r;return f}function n(t){$.ajax({type:"GET",dataType:"jsonp",cache:!1,url:t,success:function(t){var n=t.data.length;for(var r=0;r<n;r++){var i="http://maps.googleapis.com/maps/api/staticmap?center="+t.data[r].location.latitude+","+t.data[r].location.longitude+"&"+"zoom=13&"+"size=612x100&"+"markers=icon:http://i.imgur.com/QbSul.png%7Cshadow:false%7C"+t.data[r].location.latitude+","+t.data[r].location.longitude+"&"+"sensor=true",s=t.data[r].link||null,o=t.data[r].images.standard_resolution.url||null,u=null;t.data[r].caption?u=t.data[r].caption.text:u="";var a=null;t.data[r].location.name?(a=t.data[r].location.name,a="<span class='location'> &nbsp;&mdash;&nbsp; "+a+"&nbsp; / </span>"):a="";var f=e(t.data[r].created_time);f="<span class='date'>"+f+"</span> ",$(".pics").append("<li class='group'><div class='image'><a target='_blank' href='"+s+"'>"+"<img src='"+o+"' />"+"</a>"+"</div>"+"<div class='meta'>"+"<img class='face-map' src='"+i+"' />"+"<div class='info'>"+u+a+" &nbsp;"+f+"</div>"+"</div>"+"</li>")}window.nextPage=t.pagination.next_url,$(".load-more").html("Load More"),$("li").length>0&&$(".first-load").hide()}})}function a(){var e=$(window).scrollTop(),t=$(document).height(),n=1-e*.01,s=150-Math.floor(e*1);s<=r&&i.css({padding:s+"px 0"}),n>1&&(n=1),n<=1&&n>=0&&i.css("opacity",n)}var t="https://api.instagram.com/v1/users/14989250/media/recent/?access_token=14989250.a1982d7.a9539f2ed5744019b8bcf46a876152df";n(t),$(".load-more").click(function(){return console.log("next page: "+nextPage),$(this).html('<img src="images/ajax-loader.gif" />'),n(nextPage),!1}),$(".scroll-top").click(function(){return $("html, body").animate({scrollTop:0},"slow"),!1});var r=526,i=$(".header .logo"),s=10,o=navigator.userAgent,u={ios:o.match(/(iPhone|iPod|iPad)/),blackberry:o.match(/BlackBerry/),android:o.match(/Android/)};$(window).scroll(function(){if(u.ios||u.blackberry||u.android)return;a();var e=$(window).scrollTop();e>1e3?$(".scroll-top").fadeIn(300):$(".scroll-top").fadeOut(300)})});
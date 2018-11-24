jQuery(document).ready(function($) {

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});
  
});



TweenLite.defaultEase = Linear.easeNone;
var ctrl = new ScrollMagic.Controller();


$(".content").each(function(i) {
  let target1 = $(this).find(".header");
  let target2 = $(this).find(".copy");
  let target3 = $(this).find(".skill-graph-img");

    let target4 = $(this).find(".project-box");




  var tl = new TimelineMax();

  tl.from(target1, 0.5, { opacity: 0, x: 35, delay: 0.8 });
  tl.from(target2, 1, { opacity: 0 }, "-=0.2");
    tl.from(target4, 1, { opacity: 0 }, "-=0.2");
    tl.from(target3, 0.5, { opacity: 0, y: -45, delay: 2.6 });
  new ScrollMagic.Scene({
    triggerElement: this,
    triggerHook: 0.5
  })
    .setTween(tl)
    .addTo(ctrl)
});

$(".contact-detail-right").each(function(i) {

    let target5 = $(this).find(".nameheading ");
    let target6 = $(this).find(".c-name ");
    let target7 = $(this).find(".c-email-heading");
    let target8 = $(this).find(".c-email");
    let target9 = $(this).find(".c-msg");
    let target10 = $(this).find(".c-msgbox");
    let target11 = $(this).find(".c-send");



    var tl = new TimelineMax();

    tl.from(target5, 0.5, { opacity: 0, x: 35, delay: 1.5 });

    tl.from(target7, 0.5, { opacity: 0 }, "-=0.2");
    tl.from(target8, 0.5, { opacity: 0 }, "-=0.2");
    tl.from(target9, 0.5, { opacity: 0 }, "-=0.2");
    tl.from(target10, 0.5, { opacity: 0 }, "-=0.2");
    tl.from(target11, 0.5, { opacity: 0 }, "-=0.3");
    tl.from(target6, 0.5, { opacity: 0, x: 35, delay: 0.1 });


    new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 0.5
    })
        .setTween(tl)
        .addTo(ctrl)
});




$('#one').addClass("active");

$(document).scroll(function () {
  

  // add class active to nav a on scroll
  var scrollPos = $(document).scrollTop() + 100;
  $('nav ul li a').each(function () {
    var currLink = $(this);
    var refElement = $(currLink.attr("href"));
    if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
      $('nav ul li a').removeClass("active");
      currLink.addClass("active");
    }
  });
  
});
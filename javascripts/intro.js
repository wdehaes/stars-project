function introOpening(intro) {
  var intro = $('.intro');
  var tl = new TimelineLite();
  tl.from(intro, 0.6, {
    y: "400px",
    ease: Back.easeOut.config(1)
  });
}

function introToStart() {
  var tl = new TimelineLite();
  var intro = $('.intro');
  var topFirst = $('.start-top__first');
  var topSecond = $('.start-top__second');
  var bottom = $('.start-bottom');
  var he = $('.start-helium');
  var h = $('.start-hydrogen');
  tl
    .to(intro, 1, { opacity: 0, ease: Power2.easeOut, autoAlpha:0 })
    .add('topFirst', "-=0.5")
    .to(topFirst, 0.5, { opacity: 1}, 'topFirst')
    .from(topFirst, 0.5, { y: "30px", ease: Back.easeOut.config(1.4)}, 'topFirst')
    .add('topSecond', "-=0.25")
    .to(topSecond, 0.5, { opacity: 1}, 'topSecond')
    .from(topSecond, 0.5, { y: "30px", ease: Back.easeOut.config(1.4)}, 'topSecond')
    .add('bottom')
    .to(bottom, 0.5, {opacity: 1}, 'bottom')
    .from(bottom, 0.5, { y: "30px", ease: Back.easeOut.config(1.4)}, 'bottom')
    .add('helium', "-=0.25")
    .to(he, 0.5, { opacity: 1}, 'helium')
    .from(he, 0.5, { y: "30px", ease: Back.easeOut.config(4) }, 'helium')
    .add('hydrogen', "-=0.05")
    .to(h, 0.5, { opacity: 1}, 'hydrogen')
    .from(h, 0.5, { y: "30px", ease: Back.easeOut.config(4)}, 'hydrogen');
}

function startToCircleText() {
  var tl = new TimelineLite();
  var topFirst = $('.start-top__first');
  var topSecond = $('.start-top__second');
  var bottom = $('.start-bottom');
  var he = $('.start-helium');
  var h = $('.start-hydrogen');
  var circleText = $('#circle-text');
  tl
    .add('fade')
    .to(topFirst, 1, { opacity: 0, ease: Power2.easeOut, autoAlpha:0 }, 'fade')
    .to(topSecond, 1, { opacity: 0, ease: Power2.easeOut, autoAlpha:0 }, 'fade')
    .to(bottom, 1, { opacity: 0, ease: Power2.easeOut, autoAlpha:0 }, 'fade')
    .to(circleText, 1, { opacity: 1, ease: Power2.easeOut }, 'fade');
}

$(document).ready(function($) {
  var viewWidth, viewHeight, tl, intro;

  var topFirst = $('.start-top__first');
  var topSecond = $('.start-top__second');
  var bottom = $('.start-bottom');
  var he = $('.start-helium');
  var h = $('.start-hydrogen');
  var circleText = $('#circle-text');

  function randomInt(max, min) {
    if (min === undefined) {
      min = 0;
    }
    return Math.floor(random(max, min));
  }
  function random(max, min) {
    if (min === undefined) {
      min = 0;
    }
    return Math.random() * (max - min) + min;
  }

  function introText() {
      tl.to(intro, 0.1, {display:'block'})
        .from(intro, 0.6, {
      y: "400px",
      ease: Back.easeOut.config(1)
    }, "-=0.1");
  }

  function introToStart() {
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
    tl
      .add('fade')
      .to(topFirst, 1, { opacity: 0, ease: Power2.easeOut, autoAlpha:0 }, 'fade')
      .to(topSecond, 1, { opacity: 0, ease: Power2.easeOut, autoAlpha:0 }, 'fade')
      .to(bottom, 1, { opacity: 0, ease: Power2.easeOut, autoAlpha:0 }, 'fade')
      .to(circleText, 1, { opacity: 1, ease: Power2.easeOut }, 'fade');
  }

  function HeAndHClustering() {

  }

  function init() {

    function scrollIndicator() {
      var animation = 0;

      var animationFunctions = [
        introToStart,
        hydrogenAndHelium
        // startToCircleText,
        // elementsCreation,
        // protostar,
        // starryNight
      ];
      var indicator = new WheelIndicator({
          elem: document.querySelector('body'),
          callback: function(e){
            if (animation < animationFunctions.length) {
              animationFunctions[animation]();
              animation+=1;
            }
          }
        });
      indicator.getOption('preventMouse');
    };


    viewWidth = view.width,
    viewHeight = view.height,
    tl = new TimelineLite(),
    intro = $('.intro');


    scrollIndicator();
    introText();
  }

  init();
});

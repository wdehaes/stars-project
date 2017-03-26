$(document).ready(function($) {
  var tl, intro;

  var topFirst = $('.start-top__first');
  var topSecond = $('.start-top__second');
  var bottom = $('.start-bottom');
  var he = $('.start-helium');
  var h = $('.start-hydrogen');
  var circleText = $('#circle-text');

  // function generateElement(elementCoord) {
  //   if (elementCoord.type === 'circle') {
  //     var radius = parseFloat(elementCoord.width) * size.width / 200;
  //     var centerPoint = new Point(parseFloat(elementCoord.width) / 200 * size + {x: radius, y: radius});
  //     var circle = new Path.Circle(centerPoint, radius);
  //     circle.opacity = 0.5;
  //     circle.fillColor = 'white';

  //     var symbol = Math.random() > 0.3 ? "H" : "He";
  //     var text = new PointText(centerPoint);
  //     text.fillColor = 'white';
  //     text.fontFamily = "ConcourseT6";
  //     text.fontSize = Math.round(parseFloat(elementCoord.width) * size.width / 275);
  //     text.content = symbol;
  //     return circle;
  //   }
  // }

  function elementsCreation() {
    fadeOutCircleText();
    // var elements = elementsCoordinates.map(generateElement);
    // elements.map(
    //   function(element, index) {
    //     // $(element).attr('id', index);
    //     // sky.append(element);
    //     var diff = random(0, 1.2);
    //     tl.to(element, 2, {opacity:1}, 'elements+=' + diff);
    //   }
    // );
  }

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
    circleText.circleType({radius: 220, dir:-1});
    for (var i = 22; i <= 43; i++) {
      $('#circle-text .char' + i).addClass('yellow');
    };

    tl
      .add('fade')
      .to(topFirst, 1, { opacity: 0, ease: Power2.easeOut, autoAlpha:0 }, 'fade')
      .to(topSecond, 1, { opacity: 0, ease: Power2.easeOut, autoAlpha:0 }, 'fade')
      .to(bottom, 1, { opacity: 0, ease: Power2.easeOut, autoAlpha:0 }, 'fade')
      .to(circleText, 1, { opacity: 1, ease: Power2.easeOut }, 'fade');
  }

  function fadeOutCircleText() {
    var letters = $('#circle-text span').toArray().reverse();
    tl
      .staggerTo(letters, 0.25, {
        opacity: 0,
        autoAlpha: 0
      }, 0.01)
      .to(he, 1, { opacity: 0, ease: Power2.easeOut, autoAlpha: 0 }, 0.2)
      .to(h, 1, { opacity: 0, ease: Power2.easeOut, autoAlpha: 0 }, 0.2);

      // ballCanvas;
  }

  function init() {

    function scrollIndicator() {
      var animation = 0;

      var animationFunctions = [
        introToStart,
        startToCircleText,
        elementsCreation
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
    tl = new TimelineLite(),
    intro = $('.intro');

    scrollIndicator();
    introText();
  }

  init();
});

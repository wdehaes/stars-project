$(document).ready(function($) {
  var size, center, tl, intro;

  var topFirst = $('.start-top__first');
  var topSecond = $('.start-top__second');
  var bottom = $('.start-bottom');
  var he = $('.start-helium');
  var h = $('.start-hydrogen');
  var circleText = $('#circle-text');

  var createAlignedText = function(str, path, style) {
      if (str && str.length > 0 && path) {
          // create PointText object for each glyph
          var glyphTexts = [];
          for (var i = 0; i < str.length; i++) {
              glyphTexts[i] = createPointText(str.substring(i, i+1), style);
              glyphTexts[i].justification = "center";
          }
          // for each glyph find center xOffset
          var xOffsets = [0];
          for (var i = 1; i < str.length; i++) {
              var pairText = createPointText(str.substring(i - 1, i + 1), style);
              pairText.remove();
              xOffsets[i] = xOffsets[i - 1] + pairText.bounds.width -
                  glyphTexts[i - 1].bounds.width / 2 - glyphTexts[i].bounds.width / 2;
          }
          // set point for each glyph and rotate glyph aorund the point
          for (var i = 0; i < str.length; i++) {
              var centerOffs = xOffsets[i];
              if (path.length < centerOffs) {
                  if (path.closed) {
                      centerOffs = centerOffs % path.length;
                  }  else {
                      centerOffs = undefined;
                  }
              }
              if (centerOffs === undefined) {
                  glyphTexts[i].remove();
              } else {
                  var pathPoint = path.getPointAt(centerOffs);
                  glyphTexts[i].point = pathPoint;
                  var tan = path.getTangentAt(centerOffs);
                  glyphTexts[i].rotate(tan.angle, pathPoint);
              }
          }
      }
  }

  // create a PointText object for a string and a style
  var createPointText = function(str, style) {
      var text = new PointText();
      text.content = str;
      if (style) {
          if (style.font) text.font = style.font;
          if (style.fontFamily) text.fontFamily = style.fontFamily;
          if (style.fontSize) text.fontSize = style.fontSize;
          if (style.fontWeight) text.fontWeight = style.fontWeight;
      }
      return text;
  }

  function generateElement(elementCoord) {
    if (elementCoord.type === 'circle') {
      var radius = parseFloat(elementCoord.width) * size.width / 200;
      var centerPoint = new Point(parseFloat(elementCoord.width) / 200 * size + {x: radius, y: radius});
      var circle = new Path.Circle(centerPoint, radius);
      circle.opacity = 0.5;
      circle.fillColor = 'white';

      var symbol = Math.random() > 0.3 ? "H" : "He";
      var text = new PointText(centerPoint);
      text.fillColor = 'white';
      text.fontFamily = "ConcourseT6";
      text.fontSize = Math.round(parseFloat(elementCoord.width) * size.width / 275);
      text.content = symbol;
      return circle;
    }
  }

  function elementsCreation() {
    fadeOutCircleText();
    var elements = elementsCoordinates.map(generateElement);
    elements.map(
      function(element, index) {
        // $(element).attr('id', index);
        // sky.append(element);
        var diff = random(0, 1.2);
        tl.to(element, 2, {opacity:1}, 'elements+=' + diff);
      }
    );
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
      // Path Example
      // var circleRadius = 200;
      // var P1 = new paper.Point(center - {x: circleRadius, y: 0});
      // var P2 = new paper.Point(center + {x: circleRadius, y: 0});
      // var pMiddle = new paper.Point (center + {x: 0, y: circleRadius} );
      // var myFirstArc = new paper.Path.Arc(P1, pMiddle, P2);
      // pathfullySelected = true;
      // createAlignedText("but these gases were not evenly distributed and began to cluster", myFirstArc, {fontSize: 24, fontFamily: 'ConcourseT6'});

  }

  function fadeOutCircleText() {
    var letters = $('#circle-text span').toArray().reverse();
    tl
      .staggerTo(letters, 0.25, {
        opacity: 0,
        autoAlpha: 0
      }, 0.01)
      .to(he, 1, { opacity: 0, ease: Power2.easeOut, autoAlpha: 0 }, 0.2)
      .to(h, 1, { opacity: 0, ease: Power2.easeOut, autoAlpha: 0 }, 0.2)
  }

  function HeAndHClustering() {

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

    size = view.size;
    center = view.center;
    scrollIndicator();
    introText();
  }

  init();
});

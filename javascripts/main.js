$(document).ready(function() {
  var topFirst = $('.start-top__first');
  var topSecond = $('.start-top__second');
  var bottom = $('.start-bottom');
  var he = $('.start-helium');
  var h = $('.start-hydrogen');

  introOpening();

  var indicator = new WheelIndicator({
    elem: document.querySelector('body'),
    callback: function(e){

      if (animation < animationFunctions.length) {
        pauseScroll();
        var currentFunction = animationFunctions[animation];
        currentFunction.func(currentFunction.argument);
        animation+=1;
      }
    }
  });

  function restartScroll() {
    indicator.turnOn();
  }

  function pauseScroll() {
    indicator.turnOff();
    setTimeout(restartScroll,2000);
  }

  //The method call
  indicator.getOption('preventMouse'); // true
  //Disable scrolling on touch
  $('body').bind('touchmove', function(e){e.preventDefault();});
  //loop through different animation functions
  var animation = 0;
  var animationFunctions = [
    { func: introToStart},
    { func: startToCircleText},
    { func: elementsCreation, argument: importSVG},
    { func: oneStar, argument: importSVG},
    { func: centralStarStart, argument: importSVG },
    { func: centralStarSupernova},
    { func: centralStarOne},
    { func: centralStarSwitch, argument: [importSVG, 'star-start', 'star-outer-collapse']}
  ];

  var circleText = $('#circle-text');
  circleText.circleType({radius: 220, dir:-1});
  for (var i = 22; i <= 43; i++) {
    $('#circle-text .char' + i).addClass('yellow');
  }
  var protoText = $('#proto-text');
  protoText.circleType({radius: 70, dir:-1});
});

function randomInt(max, min) {
  if (min === undefined) { min = 0;}
  return Math.floor(random(max, min));
}

function random(max, min) {
  if (min === undefined) { min = 0;}
  return Math.random() * (max - min) + min;
}

function importSVG(svgName, target, callback) {
  $.get('img/' + svgName + '.svg', function(data) {
    target.append($(data).contents());
    if (callback !== undefined) {
      callback();
    }
  });
}

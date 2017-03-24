$(document).ready(function() {
  var intro = $('.intro');
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
        animationFunctions[animation]();
        animation+=1;
      }
    }
  });

  //The method call
  indicator.getOption('preventMouse'); // true
  var animation = 0;

  var animationFunctions = [
    introToStart,
    startToCircleText,
    elementsCreation,
    protostar,
    starryNight
  ];


  var circleText = $('#circle-text');
  circleText.circleType({radius: 220, dir:-1});
  for (var i = 22; i <= 43; i++) {
    $('#circle-text .char' + i).addClass('yellow');
  }
});

  var protoText = $('#proto-text');
  protoText.circleType({radius: 70, dir:-1});



//https://github.com/promo/wheel-indicator

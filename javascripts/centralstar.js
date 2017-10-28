function centralStarStart(importFunction) {
  var sky, star, topText;

  function starStart() {
    star = $('.star-svg');
    new TweenLite.to(star, 2, {opacity: 1, onComplete: rotate});
  }

  function rotate() {
    var gravity = $('#gravity');
    var coreEnergy = $('#core-energy');
    var tlRotateGravity = new TimelineMax({repeat:-1});
    tlRotateGravity.to(gravity, 2, {rotation:180, svgOrigin:"197 187"})
            .to(gravity, 2, {rotation: 0, svgOrigin:"197 187"});
    var tlRotateCoreEnergy = new TimelineMax({repeat:-1, delay: 1});
    tlRotateCoreEnergy.to(coreEnergy, 2, {rotation: 180, svgOrigin:"197 187"})
            .to(coreEnergy, 2, {rotation: 0, svgOrigin:"197 187"});
  }

  function emptyCanvas() {
    var stars = sky.find('*');
    new TweenMax.staggerTo(stars, 2, {opacity: 0, autoAlpha: 0}, 0);
    new TimelineLite().to(sky, 1, { background: 'white', opacity: 0})
                      .to(sky, 1, {opacity: 1});
  }

  function centralStarTextInitiate() {
    var sky = $('#elem-sky');
    var explanation = $('<div class="star-explanation"></div>');
    centralStarTextChange(0, explanation);
    sky.append(explanation);
  }

  function init() {
    sky = $('#elem-sky');
    emptyCanvas();
    $('body').css('background-color', 'white');
    setTimeout(function () {importFunction('star-start', sky, starStart);}, 1500);
    setTimeout(function () {centralStarTextInitiate();}, 2500);
  }

  init();
}


function centralStarSupernova() {
  var explanation = $('.star-explanation');
  var gravity = $('#gravity');
  var coreEnergy = $('#core-energy');
  var arrows = $('#arrows');
  TweenLite.to(gravity, 2, {opacity: 0, autoAlpha: 0});
  TweenLite.to(coreEnergy, 2, {opacity: 0, autoAlpha: 0});
  TweenLite.to(arrows, 2, {opacity: 0, autoAlpha: 0});
  TweenLite.to(explanation, 2, {opacity:0, onComplete: function() {
    centralStarTextChange(1, explanation);
  }});
}

function centralStarOne() {
  var explanation = $('.star-explanation');
  TweenLite.to(explanation, 2, {opacity: 0, onComplete: function() {
    centralStarTextChange(2, explanation);
  }});
}
 
function centralStarTextChange(n, target) {
  var textArray = [
    '<p>A star’s external <span class="oker">gravity</span></p>&#13;<p>and internal core <span class="oker">energy</span> put pressure on one another</p>',
    '<p>resulting in a supernova</p>&#13;<p>and one of <span class="oker">two</span> endothermic processes</p>',
    '<p><span class="oker">one</span> during a massive explosion</p>'
    ];
    target.empty();
    target.append(textArray[n]);
    centralStarText(target);
    // TweenLite.to(target, 2, {opacity: 1});
}

function centralStarSwitch(argument) {
  var importFunction = argument[0];
  var oldStarName = argument[1];
  var newStarName = argument[2];
  var sky = $('#elem-sky');
  var oldStar = $('#' + oldStarName + '-svg');
  TweenLite.to(oldStar, 1, {opacity: 0, autoAlpha: 0}, function() {
    oldStar.remove();
  });
  importFunction(newStarName, sky, function() {
    var newStar = $('#'+ newStarName + '-svg');
    TweenLite.to(newStar, 1, {opacity: 1});
  });
}
function oneStar(importFunction) {
  elementsText(2);
  var sky = $('#elem-sky');
  var scale = 6.3;
  var SVGWidth = 9;
  var star, bg, skyWidth, skyHeight, tl_one, tl_two, starCenterX, starCenterY, boundingRectProtostar, boundingRectSVG, radius, protostarCenterY, protostarCenterX;

  // Move 1 element to the protostar
  function moveElementToCenter(element) {
    var elementText = $(element).find('.elem-text');
    var elementBackground = $(element).find('.elem-bg');
    var nucleus = atomicNuclei.sort(function() { return 0.5 - Math.random();}).pop();
    var bgColor = nucleus.width > 0.04 ? "#FF0000" : "white";
    var elementWidth = nucleus.width * radius;
    var elementLeft = protostarCenterX + radius * parseFloat(nucleus.xPos);
    var elementTop = protostarCenterY + radius * parseFloat(nucleus.yPos);
    tl_two.to(elementText, 1, { opacity: 0, autoAlpha: 0}, "moveElementAwayFromCenter+=2")
          .to(elementBackground, 2, {css: {background: bgColor}}, "moveElementAwayFromCenter+=2")
          .to(element, 2, {css: {width: elementWidth, height: elementWidth, top: elementTop, left: elementLeft}}, "moveElementAwayFromCenter+=2");
  }

  function moveElementAwayFromCenter(element) {
    var diffX = (element.offsetLeft - protostarCenterX);
    var diffY = (element.offsetTop - protostarCenterY);
    var distX = 0.10 * (skyWidth - Math.abs(diffX));
    var distY = 0.10 * (skyHeight - Math.abs(diffY));
    var topSign, leftSign;
    if (diffY < 0) {
      topSign = "-=";
    } else {
      topSign = "+=";
    }
    if (diffX < 0) {
      leftSign = "-=";
    } else {
      leftSign = "+=";
    }
    tl_two.to(element, 3, {css: {top: topSign + distY + "px", left: leftSign + distX + "px"}}, "moveElementAwayFromCenter");

  }

  // Move all of the elements
  function elementsMove(movementFunction) {
    var sourceElements = $('.elem');
    sourceElements.map(function(index, element) {
      movementFunction(element);
    });
    elementsText(1);
  }

  function determineCoordinates() {
    boundingRectProtostar = bg[0].getBoundingClientRect();
    boundingRectSVG = star[0].getBoundingClientRect();
    var SVGCenterX = boundingRectSVG.left + boundingRectSVG.width/2;
    var SVGCenterY = boundingRectSVG.top + boundingRectSVG.height/2;
    starCenterX = boundingRectProtostar.left + boundingRectProtostar.width/2;
    starCenterY = boundingRectProtostar.top + boundingRectProtostar.height/2;
    var distX = (SVGCenterX - starCenterX) * scale;
    var distY = (SVGCenterY - starCenterY) * scale;
    radius = boundingRectProtostar.width/2 * scale;
    protostarCenterY = SVGCenterY - distY;
    protostarCenterX = SVGCenterX - distX;
  }

  function init() {
    star = $('.protostar');
    bg = $('#protostar-bg');
    skyWidth = sky.width();
    skyHeight = sky.height();
    determineCoordinates();
    tl_one = new TimelineLite({delay: 2});
    var protoText = $('#protostar-text');
    tl_one.to(protoText, 1, { opacity: 0, autoAlpha: 0}, 'disappear');
    var h = $('#protostar-h');
    tl_one.to(h, 1, { opacity: 0, autoAlpha: 0}, 'disappear');
    tl_one.to(star, 3, {opacity: 1, scale: scale, transformOrigin: "50% 50%"});
    tl_one.to(bg, 2, {background: '#CB5822', opacity: 1}, "-=2");

    tl_two = new TimelineLite({delay: 3 });
    elementsMove(moveElementToCenter);
    elementsMove(moveElementAwayFromCenter);
  }

  init();
}


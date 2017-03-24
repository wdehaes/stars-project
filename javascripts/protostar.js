function protostar() {
  function newCoordinates(oldCoordinates) {
    // body...
  }
  var tl_proto = new TimelineLite({onComplete: oneStar()}),
      elements = $('.elem').toArray();
  elements.map(function(element) {
    if ( element.getAttribute('id') !== '20') {
      var diff = random(0, 1);
      tl_proto.to(element, 0.8, {opacity:0, autoAlpha: 0}, 'elements+=' + diff);
    } else {
      tl_proto.to(element, 4, {color: 'white' }, 'elements');
    }
  });
  var protoText = $('#proto-text');
  TweenLite.to(protoText, 1, { opacity: 0.25});
  elementsText(2);
}

  function starryNight() {
    var sky = $('#elem-sky'),
        totalAppearTime = 4,
        appearTime = 1,
        numberOfStars = 30,
        tlAppear,
        tlTwinkle,
        skyWidth = sky.width(),
        skyHeight = sky.height(),
        starEndxPos = 0.9 * skyWidth,
        starEndYPos = 0.6 * skyHeight,
        tlAppear = new TimelineLite();
        // tlTwinkle = new TimelineLite({delay: appearTime});
    function generateStar(starCoord) {
      var star = $('<div class="star"/>'),
          starWidth = parseFloat(starCoord.width) * skyWidth / 100,
          starHeight = parseFloat(starCoord.height) * skyHeight / 100,
          xPos = parseFloat(starCoord.left) * skyWidth / 100,
          yPos = parseFloat(starCoord.top) * skyHeight / 10;

      $(star).css({
        width: starWidth,
        height: starHeight,
        left: xPos,
        top: yPos,
        opacity: 0,
      });
      return star;
    }

    function addStarToTimeline(star) {
      var maxBrightness = random(0.1, 0.85).toFixed(2);
      tlAppear.to(star, appearTime, {opacity: maxBrightness}, "-=" + (numberOfStars-1)*totalAppearTime/numberOfStars);
      // tlTwinkle.to(star, appearTime, {opacity: maxBrightness}, "-=" + (numberOfStars-1)*totalAppearTime/numberOfStars);
    }

    function init() {
      var oneStar = $('.elem#20'),
          atoms = $('.atom').toArray(),
          stars = starCoordinates.map(generateStar);
      var bg = oneStar.find('.elem-bg');
      elementsText(3, 1.5);
      tlAppear.staggerTo(atoms, 0.5, {scale: 0.1, opacity: 0, autoAlpha: 0}, 0.005)
              .to(bg, 1, {background: 'white', opacity: 1}, "move")
              .to(oneStar, 1, { scale: 1 }, 'move')
              .to(oneStar, 2, {left: starEndxPos, top: starEndYPos, ease: Power2.easeOut}, 'move');
      stars.map(
        function(star, index) {
        sky.append(star);
        addStarToTimeline(star);
      })
    }

    init();
  }

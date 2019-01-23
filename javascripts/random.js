    function randomInt(max, min) {
      if (min == undefined) { min = 0}
      return Math.floor(random(max, min));
    }
    function random(max, min) {
      if (min == undefined) {
        min = 0
      }
      return Math.random() * (max - min) + min;
    }

    function generateRandomStar() {
      var skyWidth = sky.width();
      var skyHeight = sky.height();
      var minStarWidth = Math.floor(skyWidth / 200);
      var maxStarWidth = Math.floor(skyWidth / 30);
      var maxStarHeight = 2 * maxStarWidth;
      var minStarHeight = Math.floor(1.2 * maxStarWidth);
      var xPos = randomInt(maxStarWidth, skyWidth - maxStarWidth);
      var yPos = randomInt(maxStarHeight, skyHeight - maxStarHeight);
      var starWidth = randomInt(minStarWidth, maxStarWidth);
      var starHeight = randomInt(maxStarHeight, minStarHeight);

      var star = $('<div class="star"/>');
      $(star).css({
        width: starWidth,
        height: starHeight,
        left: xPos,
        top: yPos
      });
      return star
    }

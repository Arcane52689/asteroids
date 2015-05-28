;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  var SOURCES =["salt-croc.png", "spider.png", "tas-devil.png", "snake.png"];

  var Asteroid = Asteroids.Asteroid = function(pos, game, radius) {
    if (!radius) { radius = 60}
    Asteroids.MovingObject.call(
      this,
      pos,
      Asteroid.randomVector(),
      radius,
      COLOR,
      game
    );
    console.log(this.radius)
    this.img = new Image();
    this.img.src = Asteroid.randomImage();
  };


  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  var COLOR = Asteroids.Util.randomColor();
  var RADIUS = 25;

  Asteroid.randomVector = function() {
    var xVec = (Math.floor(Math.random() * 6) - 3);
    var yVec = (Math.floor(Math.random() * 6) - 3);
    if ((xVec === 0) && (yVec ===0)) {
      return Asteroid.randomVector();
    }
    else {
      return [xVec, yVec];
    }
  };

  Asteroid.randomImage = function () {
    return SOURCES[Math.floor(Math.random() * SOURCES.length)];
  };

  Asteroid.prototype.isCollidedWith = function(obj) {
    if (this.radius + obj.radius >= this.distanceFrom(obj)) {
      if (obj instanceof Asteroids.Ship) {
        obj.relocate();
      }

      if (obj instanceof Asteroids.Bullet) {
        return true;
      }
    }

    return false;
  };


  Asteroid.prototype.split = function() {
    if (this.radius >= 20) {
      c1 = new Asteroids.Asteroid(this.pos, this.game, this.radius / 2);
      c2 = new Asteroids.Asteroid(this.pos, this.game, this.radius / 2);
      this.game.asteroids.push(c1);
      this.game.asteroids.push(c2);
    }
  }

})();

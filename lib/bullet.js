;(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var RADIUS = 2;

  var Bullet = Asteroids.Bullet = function(pos, vel, game) {
    Asteroids.MovingObject.call(
      this,
      pos,
      [vel[0]+1, vel[1]+1],
      RADIUS,
      Asteroids.Util.randomColor(),
      game
    )
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);


})();

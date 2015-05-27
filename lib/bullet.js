;(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var RADIUS = 5;

  var Bullet = Asteroids.Bullet = function(pos, vel, game) {
    if ((vel[0] === 0) && (vel[1] === 0)) {
      vel = [1,1];
    }
    Asteroids.MovingObject.call(
      this,
      pos,
      [Math.floor(vel[0]*1.5), Math.floor(vel[1]*1.5)],
      RADIUS,
      Asteroids.Util.randomColor(),
      game
    );
    this.img = new Image();
    this.img.src = "leaf.png";

    this.wrappable = false;
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);


})();

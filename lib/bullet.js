;(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var RADIUS = 5;

  var Bullet = Asteroids.Bullet = function(pos, vector, game) {

    Asteroids.MovingObject.call(
      this,
      pos,
      [Math.floor(vector[0]*8), Math.floor(vector[1]*8)],
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

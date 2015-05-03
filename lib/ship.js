;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  var RADIUS = 10;
  var COLOR = Asteroids.Util.randomColor();
  var Ship = Asteroids.Ship = function (pos, game) {
    Asteroids.MovingObject.call(
      this,
      pos,
      [0,0],
      RADIUS,
      COLOR,
      game
    );
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);


  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function(impulse) {
    if (Math.abs(this.vel[0] + impulse[0]) <= 5 ) {
      this.vel[0] += impulse[0];
    }
    if (Math.abs(this.vel[1] + impulse[1]) <= 5 ) {
      this.vel[1] += impulse[1];
    }
  };

  Ship.prototype.velNorm = function() {
    return
  };

  Ship.prototype.fireBullet = function() {
    var bullet = new Asteroids.Bullet(this.pos, this.vel, this.game);
    this.game.bullets.push(bullet);
  };

})();

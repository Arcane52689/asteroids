;(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color, game) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.game = game;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    this.pos = this.game.wrap(this.pos);
  };

  MovingObject.prototype.distanceFrom = function(obj) {
    var dx = obj.pos[0] - this.pos[0];
    var dy = obj.pos[1] - this.pos[1];
    return Math.sqrt(dx*dx + dy*dy);
  };

  MovingObject.prototype.isCollidedWith = function(obj) {
    return this.radius + obj.radius >= this.distanceFrom(obj);
  };


})();

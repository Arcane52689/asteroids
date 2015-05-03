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
    this.wrappable = true;
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
    if (this.img) {
      ctx.save();
      ctx.clip();
      var topRight = [ this.pos[0]-Math.floor(this.radius * 1.414), this.pos[1] - Math.floor(this.radius * 1.414)];
      var length = Math.floor(2.5 * this.radius);
      ctx.drawImage(this.img,topRight[0],topRight[1], length,length);
      ctx.restore();
    } else{
      ctx.fill();
    }
    // ctx.fill();

  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.wrappable) {
      this.pos = this.game.wrap(this.pos);
    }
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

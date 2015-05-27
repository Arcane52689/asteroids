;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  var RADIUS = 20;
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
    this.img = new Image();
    this.img.src = "koala.png";
    this.radians = 0;
    this.magnitude = 0;
    this.pointer = new Asteroids.Pointer(this, this.game);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.vector = function() {
    var x,y;
    x = Math.cos(this.radians * Math.PI);
    y = Math.sin(this.radians * Math.PI);
    return [x, y]
  };

  Ship.prototype.updateVelocity = function() {
    var vector = this.vector();
    this.vel = [Math.floor(vector[0] * this.magnitude),
      Math.floor(vector[1] * this.magnitude)]
  }

  Ship.prototype.boost = function() {
    if (this.magnitude <= 5) {
      this.magnitude += 1
    }
      this.updateVelocity();
  }

  Ship.prototype.slow = function() {
    if (this.magnitude > 0) {
      this.magnitude -= 1
    }
    this.updateVelocity();

  }



  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
    this.magnitude = 0;
  };

  Ship.prototype.power = function(impulse) {
    if (Math.abs(this.vel[0] + impulse[0]) <= 6 ) {
      this.vel[0] += impulse[0];
    }
    if (Math.abs(this.vel[1] + impulse[1]) <= 6 ) {
      this.vel[1] += impulse[1];
    }
  };


  Ship.prototype.rotateLeft = function() {
    this.radians -= .08;
  }

  Ship.prototype.rotateRight = function() {
    this.radians += .08;
  }




  Ship.prototype.fireBullet = function() {
    var newPos = [this.pointer.pos[0], this.pointer.pos[1]];
    var bullet = new Asteroids.Bullet( newPos, this.vector(), this.game);
    this.game.bullets.push(bullet);
  };

})();

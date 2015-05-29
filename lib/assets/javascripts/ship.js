;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  var RADIUS = 20;
  var COLOR = Asteroids.Util.randomColor();
  var LIVES = 3;

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
    this.img.src = "./lib/assets/images/koala.png";
    this.radians = 0;
    this.magnitude = 0;
    this.pointer = new Asteroids.Pointer(this, this.game);
    this.lives = LIVES;
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
    if (this.magnitude > -2) {
      this.magnitude -= .5
    }
    this.updateVelocity();

  }



  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
    this.magnitude = 0;
    this.lives -= 1;
    $("#score").text("Score: "+ this.game.score+ "     Lives: " + this.game.ship.lives   )
  };


  Ship.prototype.rotateLeft = function() {
    this.radians -= .1;


  }

  Ship.prototype.rotateRight = function() {
    this.radians += .1;


  }




  Ship.prototype.fireBullet = function() {
    var newPos = [this.pointer.pos[0], this.pointer.pos[1]];
    var bullet = new Asteroids.Bullet( newPos, this.vector(), this.game);
    this.game.bullets.push(bullet);
  };

})();

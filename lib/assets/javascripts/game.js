
;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (DIM_X, DIM_Y) {
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.NUM_ASTEROIDS = 3;
    this.asteroids = [];
    this.addAsteroids();
    this.ship = new Asteroids.Ship(this.randomPosition(), this);
    this.bullets = [];
    this.score = 0;
  };

  Game.prototype.addAsteroids = function() {
    for(var i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.addAsteroid();
    }
  };

  Game.prototype.addAsteroid = function() {
    if (this.asteroids.length < 12) {

      var a = new Asteroids.Asteroid(this.randomPosition(), this);
      this.asteroids.push(a);
    }
  };

  Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.bullets).concat(this.ship).concat(this.ship.pointer);
  };

  Game.prototype.randomPosition = function() {
    return [Math.floor(Math.random() * this.DIM_X),
      Math.floor(Math.random() * this.DIM_Y)];
  };

  Game.prototype.draw = function (ctx) {

    this.allObjects().forEach(function (a) {
      a.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (a) {
      a.move();
    });
  };

  Game.prototype.checkCollisions = function () {
    var allObjs = this.allObjects();
    for(var i = 0; i < this.asteroids.length; i++) {
      for(var j = i + 1; j < allObjs.length; j++) {
        if (this.asteroids[i].isCollidedWith(allObjs[j])) {
          this.remove(this.asteroids[i]);
          this.remove(allObjs[j]);
          break;
        }
      }
    }
    if (this.asteroids.length === 0) {
      this.NUM_ASTEROIDS++
      this.addAsteroids()
    }
  };

  Game.prototype.remove = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.score += 10;
      $("#score").text("Score: "+ this.score+ "     Lives: " + this.ship.lives   );
      obj.split();
      var idx = this.asteroids.indexOf(obj);
      this.asteroids.splice(idx, 1);
    }
    else if (obj instanceof Asteroids.Bullet) {

      var idx2 = this.bullets.indexOf(obj);
      this.bullets.splice(idx2, 1);
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
    this.removeStrayBullets();

  };

  Game.prototype.wrap = function (pos) {
    var x = pos[0];
    var y = pos[1];

    if (x > this.DIM_X) {
      x -= this.DIM_X;
    }
    else if (x < 0) {
      x += this.DIM_X;
    }

    if (y > this.DIM_Y) {
      y -= this.DIM_Y;
    }

    else if (y < 0) {
      y += this.DIM_Y;
    }

    return [x, y];
  };

  Game.prototype.outOfBounds = function(obj) {
    var x = obj.pos[0];
    var y = obj.pos[1];


    if ((x > this.DIM_X) || (y > this.DIM_Y)) {
      return true;
    }
    else if ( (x < 0) || (y < 0)) {
      return true;
    }
    else {
      return false;
    }
  };


  Game.prototype.removeStrayBullets = function() {
    this.bullets.forEach(function(bullet) {
      debugger
      if (this.outOfBounds(bullet)) {
        this.remove(bullet);
      }
    }.bind(this));
  };

  Game.prototype.isOver = function() {
    return (this.ship.lives < 1);
  };




})();

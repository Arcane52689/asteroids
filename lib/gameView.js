;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var background = new Image();
  background.onload = function() {
    ctx.drawImage(background, 0, 0);
  };
  background.src = 'Australia.png';

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.background = new Image();
    this.background.src = 'Australia.png';
  };

  GameView.prototype.renderBackground = function() {
    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.ctx.drawImage(this.background, 0, 0, this.game.DIM_X, this.game.DIM_Y);
  };


  GameView.prototype.start = function () {
    var tick = 0;
    var nextGameState = function() {
      this.game.step();
      this.renderBackground();
      this.game.draw(this.ctx);
      tick += 1;
      if (tick % 250 === 0) {
        tick = 0;
        this.game.addAsteroid();
      }
    };

    this.bindKeyHandlers();
    setInterval(nextGameState.bind(this), 20);
  };

  GameView.prototype.bindKeyHandlers = function() {
    key('w', function() { game.ship.boost(); });
    key('a', function() { game.ship.rotateLeft(); });
    key('s', function() { game.ship.slow(); });
    key('d', function() { game.ship.rotateRight(); });
    key('space', function() { game.ship.fireBullet(); });
  };

  GameView.prototype.binding2 = function() {
    if(key.isPressed('W')) {
      this.game.ship.power([0,-1]);
    }
    if(key.isPressed('A')) {
      this.game.ship.power([-1,0]);
    }
    if(key.isPressed('S')) {
      this.game.ship.power([0,1]);
    }
    if(key.isPressed('D')) {
      this.game.ship.power([1,0]);
    }
  };
})();

;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    var nextGameState = function() {
      this.game.step();
      this.game.draw(this.ctx);
    };

    this.bindKeyHandlers();
    setInterval(nextGameState.bind(this), 20);
  };

  GameView.prototype.bindKeyHandlers = function() {
    key('w', function() { game.ship.power([0,-1]) });
    key('a', function() { game.ship.power([-1,0]) });
    key('s', function() { game.ship.power([0,1]) });
    key('d', function() { game.ship.power([1,0]) });
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

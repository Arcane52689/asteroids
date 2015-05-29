;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var background = new Image();
  background.onload = function() {
    ctx.drawImage(background, 0, 0);
  };
  background.src = './lib/assets/images/Australia.png';

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.background = new Image();
    this.background.src = './lib/assets/images/Australia.png';
    this.bindKeyHandlers();
    
  };

  GameView.prototype.renderBackground = function() {
    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.ctx.drawImage(this.background, 0, 0, this.game.DIM_X, this.game.DIM_Y);
  };


  GameView.prototype.start = function () {
    $("#score").text("Score: 0   Lives: 3")
    var tick = 0;
    var nextGameState = function() {
      this.game.step();
      this.renderBackground();
      this.game.draw(this.ctx);
      tick += 1;
      if (tick % 150 === 0) {
        tick = 0;
        this.game.addAsteroid();
      }

      this.isOver();
    };

    this.interval = setInterval(nextGameState.bind(this), 20);
  };

  GameView.prototype.bindKeyHandlers = function() {
    key('w', function() { this.game.ship.boost(); }.bind(this));
    key('a', function() { this.game.ship.rotateLeft(); }.bind(this));
    key('s', function() { this.game.ship.slow(); }.bind(this));
    key('d', function() { this.game.ship.rotateRight(); }.bind(this));
    key('space', function() { this.game.ship.fireBullet(); }.bind(this));
  };




  GameView.prototype.isOver = function() {
    if (this.game.isOver()) {
      clearInterval(this.interval)
      this.renderOver();
    }
  }


  GameView.prototype.renderOver = function() {
    $("#over").removeClass("inactive").html("<h1>GAME OVER</h1><h3> You're score was " + this.game.score + "</h3> <h4> Press Enter if you want to play again </h4>");

    $(document).keypress(function(e) {
      if((e.which == 13) && (this.game.ship.lives < 1)) {
        this.reset();
      }
    }.bind(this));
  }


  GameView.prototype.reset = function() {
    this.game = new Asteroids.Game();
    $("#over").addClass("inactive").empty();
    this.start();

  }




})();

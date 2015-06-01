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
    $("#score").text("Score: 0   Lives: 3");

  };

  GameView.prototype.renderBackground = function() {
    this.ctx.clearRect(0, 0, this.game.DIM_X, this.game.DIM_Y);
    this.ctx.drawImage(this.background, 0, 0, this.game.DIM_X, this.game.DIM_Y);
  };


  GameView.prototype.start = function () {
    var tick = 0;
    var nextGameState = function() {
      this.checkPresses();
      this.game.step();
      this.renderBackground();
      // debugger

      this.game.draw(this.ctx);
      this.isOver();
    };

    this.interval = setInterval(nextGameState.bind(this), 20);
  };

  GameView.prototype.bindKeyHandlers = function() {
    key('p', function() { this.togglePause() }.bind(this));
  };


  GameView.prototype.checkPresses = function(e) {
    if ((key.isPressed("W")) || (key.isPressed("up"))) {
      this.game.ship.boost();
    }
    if ((key.isPressed("A")) || (key.isPressed("left"))) {
      this.game.ship.rotateLeft();
    }
    if ((key.isPressed("S") || key.isPressed("down"))) {
      this.game.ship.slow();
    }
    if ((key.isPressed("D")) || (key.isPressed("right"))) {
      this.game.ship.rotateRight();
    }
    if (key.isPressed(32)) {
      this.game.ship.fireBullet();
    }



  }



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
    debugger
    this.game = new Asteroids.Game(this.game.DIM_X, this.game.DIM_Y);
    $("#over").addClass("inactive").empty();
    $("#score").text("Score: 0   Lives: 3")

    this.start();
  }

  GameView.prototype.togglePause = function() {

    if (this.paused) {
      this.unPause();
    }
    else {
      this.pause();
    }
  }

  GameView.prototype.pause = function() {
    this.paused = true;
    clearInterval(this.interval);
    $("#instructions").toggleClass("inactive");
  }

  GameView.prototype.unPause = function() {
    this.paused = false;
    $("#instructions").toggleClass("inactive");
    this.start();
  }




})();

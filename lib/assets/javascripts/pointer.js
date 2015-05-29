;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  var RADIUS = 5;
  var COLOR = Asteroids.Util.randomColor();

  var Pointer = Asteroids.Pointer = function (ship, game) {
    this.ship = ship;
    var pos = [Math.floor(ship.pos[0] + ship.vector()[0]* ship.radius),
    Math.floor(ship.pos[1] + ship.vector()[1]* ship.radius)
  ];


    Asteroids.MovingObject.call(
      this,
      pos,
      [0,0],
      RADIUS,
      COLOR,
      game
    );
    this.img = new Image();
    this.img.src = "lib/assets/images/leaf.png";

  }

  Asteroids.Util.inherits(Pointer, Asteroids.MovingObject);

  Pointer.prototype.move = function () {
    this.pos = [Math.floor(this.ship.pos[0] + this.ship.vector()[0]* this.ship.radius * 1.7),
    Math.floor(this.ship.pos[1] + this.ship.vector()[1] * this.ship.radius)]


  };



})();

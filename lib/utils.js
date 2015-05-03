;(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var HEX_DIGITS = "0123456789ABCDEF"
  
  var Util = Asteroids.Util = {};

  Util.inherits = function (Sub, Super) {
    function Surrogate () {};
    Surrogate.prototype = Super.prototype;
    Sub.prototype = new Surrogate();
  };

  Util.randomColor = function () {
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += HEX_DIGITS[Math.floor((Math.random() * 16))];
    }

    return color;
  };
})();

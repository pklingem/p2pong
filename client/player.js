var p2p    = require('./p2p');
var Paddle = require('./paddle');

var keys = { left:  37, right: 39 };
var keysDown = {};

var vmax = 4;

window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});

function Player(context) {
  this.paddle = new Paddle(context, 175, 580, 50, 10);
};

Player.prototype.update = function() {
  if (keys.left  in keysDown) return this.paddle.move(-vmax, 0);
  if (keys.right in keysDown) return this.paddle.move( vmax, 0);
  this.paddle.move(0, 0);
};

Player.prototype.render = function() {
  this.paddle.render();
};

module.exports = Player;

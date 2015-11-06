var Paddle = require('./paddle');
var p2p    = require('./p2p');

var keys = { left: 37, right: 39 };
var keysDown = {};
var vmax = 4;

p2p.on('keydown', keydown);
p2p.on('keyup', keyup);

function keydown(event) {
  keysDown[event.keyCode] = true;
}

function keyup(event) {
  delete keysDown[event.keyCode];
}

function Opponent(context) {
  this.paddle = new Paddle(context, 175, 10, 50, 10);
}

Opponent.prototype.update = function() {
  if (keys.left  in keysDown) return this.paddle.move( vmax, 0);
  if (keys.right in keysDown) return this.paddle.move(-vmax, 0);
  this.paddle.move(0, 0);
};

Opponent.prototype.render = function() {
  this.paddle.render();
};

module.exports = Opponent;

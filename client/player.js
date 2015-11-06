var p2p    = require('./p2p');
var Paddle = require('./paddle');

var keys = { left: 37, right: 39 };
var keysDown = {};
var vmax = 4;

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

function keydown(event) {
  keysDown[event.keyCode] = true;
  p2p.emit('keydown', { keyCode: event.keyCode });
}

function keyup(event) {
  delete keysDown[event.keyCode];
  p2p.emit('keyup', { keyCode: event.keyCode });
}

function Player(context) {
  this.paddle = new Paddle(context, 175, 580, 50, 10);
};

Player.prototype.update = function() {
  if (keys.left  in keysDown) return this.paddle.move(-vmax);
  if (keys.right in keysDown) return this.paddle.move( vmax);
  this.paddle.move(0);
};

Player.prototype.render = function() {
  this.paddle.render();
};

module.exports = Player;

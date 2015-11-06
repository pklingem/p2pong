var Paddle = require('./paddle');

function Player(context) {
  this.paddle = new Paddle(context, 175, 580, 50, 10);
};

Player.prototype.render = function() {
  this.paddle.render();
};

module.exports = Player;

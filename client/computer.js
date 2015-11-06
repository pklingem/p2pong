var Paddle = require('./paddle');

function Computer(context) {
  this.paddle = new Paddle(context, 175, 10, 50, 10);
}

Computer.prototype.render = function() {
  this.paddle.render();
};

module.exports = Computer;

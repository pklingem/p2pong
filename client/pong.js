var animate   = require('./animate');
var Player    = require('./player');
var Computer  = require('./computer');
var Ball      = require('./ball');
var Table     = require('./table');

var table     = new Table(400, 600);
var player    = new Player(table.context);
var computer  = new Computer(table.context);
var ball      = new Ball(table.context, 200, 300);

var maxLag = 5000;
var step   = 17;

function Pong() {
  document.body.appendChild(table.canvas);
  this.lag  = 0;
  this.last = performance.now();
  animate(this.step.bind(this));
};

Pong.prototype.update = function() {
  player.update();
  ball.update(player.paddle, computer.paddle);
};

Pong.prototype.render = function(width, height) {
  table.render();
  player.render();
  computer.render();
  ball.render();
};

Pong.prototype.step = function(next) {
  this.lag += next - this.last;
  this.last = next;

  if (this.lag > maxLag) this.lag = maxLag;

  while (this.lag > step) {
    this.update();
    this.lag -= step;
  }

  this.render();
  animate(this.step.bind(this));
};

module.exports = Pong;

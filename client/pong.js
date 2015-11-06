var animate   = require('./animate');
var Player    = require('./player');
var Computer  = require('./computer');
var Ball      = require('./ball');
var Table     = require('./table');

var table     = new Table(400, 600);
var player    = new Player(table.context);
var computer  = new Computer(table.context);
var ball      = new Ball(table.context, 200, 300);

function Pong() {
  document.body.appendChild(table.canvas);
  animate(this.step.bind(this));
};

Pong.prototype.update = function() {
};

Pong.prototype.render = function(width, height) {
  table.render();
  player.render();
  computer.render();
  ball.render();
};

Pong.prototype.step = function() {
  this.update();
  this.render();
  animate(this.step.bind(this));
};

module.exports = Pong;

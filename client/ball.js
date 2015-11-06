var _ = require('lodash');

var peer = require('./peer');

var maxTheta = 0.25 * Math.PI;
var radius   = 5;
var vmax     = 3;

function bounce(ball, paddle) {
  var dx = ball.x - (paddle.x + paddle.width/2);
  var theta = maxTheta * 2 * dx / paddle.width;
  ball.vy = vmax * Math.cos(theta) * -Math.sign(ball.vy);
  ball.vx = vmax * Math.sin(theta);
}

function Ball(context) {
  this.context = context;
  this.tableHeight = context.canvas.height;
  this.tableWidth  = context.canvas.width;
  this.x  = this.tableWidth  / 2;
  this.y  = this.tableHeight / 2;
  this.vx = 0;
  this.vy = 0;

  peer.on('connected', this.start.bind(this));
  peer.on('ball', this.autocorrect.bind(this));
}

Ball.prototype.autocorrect = function(truth) {
  truth.x = this.tableWidth  - truth.x;
  truth.y = this.tableHeight - truth.y;
  truth.vx *= -1;
  truth.vy *= -1;
  _.extend(this, truth);
}

Ball.prototype.move = function() {
  this.x += this.vx;
  this.y += this.vy;
}

Ball.prototype.notify = function() {
  if (peer.connection) {
    peer.connection.send({
      type: 'ball',
      data: _.pick(this, ['x','y','vx','vy'])
    });
  }
}

Ball.prototype.render = function() {
  this.context.beginPath();
  this.context.arc(this.x, this.y, radius, 2 * Math.PI, false);
  this.context.fillStyle = "#000000";
  this.context.fill();
};

Ball.prototype.reset = function() {
  this.vx = 0;
  this.vy = 0;
  this.x  = this.tableWidth  / 2;
  this.y  = this.tableHeight / 2;
}

Ball.prototype.start = function(conn) {
  this.reset();
  var sign = peer.player == 'one' ? 1 : -1;
  this.vy = sign * vmax
  if (conn) conn.on('close', this.stop.bind(this));
}

Ball.prototype.stop = function() {
  this.reset();
  this.vx = this.vy = 0;
}

Ball.prototype.update = function(paddle1, paddle2) {
  var left   = this.x - radius;
  var right  = this.x + radius;
  var top    = this.y - radius;
  var bottom = this.y + radius;

  var hitLeftWall  = left < 0;
  var hitRightWall = right > this.tableWidth;
  var scoredPoint  = this.y < 0 || this.y > this.tableHeight;

  var hitPaddle1 = top    < (paddle1.y + paddle1.height) &&
                   bottom > paddle1.y &&
                   left   < (paddle1.x + paddle1.width) &&
                   right  > paddle1.x;

  var hitPaddle2 = top    < (paddle2.y + paddle2.height) &&
                   bottom > paddle2.y &&
                   left   < (paddle2.x + paddle2.width) &&
                   right  > paddle2.x;

  switch (true) {
    case hitLeftWall:
      this.x = radius;
      this.vx *= -1;
      break;
    case hitRightWall:
      this.x = this.tableWidth - radius;
      this.vx *= -1;
      break;
    case scoredPoint:
      this.reset();
      this.start();
      break;
    case hitPaddle1:
      bounce(this, paddle1);
      break;
    case hitPaddle2:
      bounce(this, paddle2);
      break;
  }

  this.move();
  if (peer.player === 'one') this.notify()
};

module.exports = Ball;

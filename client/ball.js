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
  this.last = performance.now();

  peer.on('connected', this.start.bind(this));
  peer.on('hit', this.autocorrect.bind(this));
}

Ball.prototype.autocorrect = function(truth) {
  truth.x = this.tableWidth  - truth.x;
  truth.y = this.tableHeight - truth.y;
  truth.vx *= -1;
  truth.vy *= -1;
  _.extend(this, truth);
}

Ball.prototype.render = function() {
  this.context.beginPath();
  this.context.arc(this.x, this.y, radius, 2 * Math.PI, false);
  this.context.fillStyle = "#000000";
  this.context.fill();
};

Ball.prototype.notify = function() {
  var next = performance.now()
  if (peer.connection && next - this.last > 100) {
    this.last = next;
    peer.connection.send({
      type: 'hit',
      data: _.pick(this, ['x','y','vx','vy'])
    });
  }
}

Ball.prototype.start = function() {
  var sign = peer.player == 'one' ? 1 : -1;
  this.vy = sign * vmax;
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
      var sign = peer.player == 'one' ? 1 : -1;
      this.vx = 0;
      this.vy = sign * vmax;
      this.x  = this.tableWidth  / 2;
      this.y  = this.tableHeight / 2;
      break;
    case hitPaddle1:
      bounce(this, paddle1);
      break;
    case hitPaddle2:
      bounce(this, paddle2);
      break;
  }

  this.x += this.vx;
  this.y += this.vy;
  if (peer.player === 'one') this.notify()
};

module.exports = Ball;

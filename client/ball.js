var radius = 5;
var vmax   = 3;

function Ball(context) {
  this.context = context;
  this.tableHeight = context.canvas.height;
  this.tableWidth  = context.canvas.width;
  this.x  = this.tableWidth  / 2;
  this.y  = this.tableHeight / 2;
  this.vx = 0;
  this.vy = vmax;
}

Ball.prototype.render = function() {
  this.context.beginPath();
  this.context.arc(this.x, this.y, radius, 2 * Math.PI, false);
  this.context.fillStyle = "#000000";
  this.context.fill();
};

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
      this.vx = 0;
      this.vy = vmax;
      this.x  = this.tableWidth  / 2;
      this.y  = this.tableHeight / 2;
      break;
    case hitPaddle1:
      this.vy = -vmax;
      this.vx += (paddle1.vx / 2);
      break;
    case hitPaddle2:
      this.vy = vmax;
      this.vx += (paddle2.vx / 2);
      break;
  }

  this.x += this.vx;
  this.y += this.vy;
};

module.exports = Ball;

function Paddle(context, x, y, width, height) {
  this.context = context;
  this.tableHeight = context.canvas.height;
  this.tableWidth  = context.canvas.width;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.vx = 0;
};

Paddle.prototype.move = function(vx) {
  this.vx = vx;

  var hitLeftWall  = this.x < 0;
  var hitRightWall = this.x + this.width > this.tableWidth;

  switch (true) {
    case hitLeftWall:
      this.x = 0;
      this.vx = 0;
      break;
    case hitRightWall:
      this.x = this.tableWidth - this.width;
      this.vx = 0;
      break;
  }

  this.x += vx;
};

Paddle.prototype.render = function() {
  this.context.fillStyle = "#0000FF";
  this.context.fillRect(this.x, this.y, this.width, this.height);
};

module.exports = Paddle;

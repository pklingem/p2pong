function Paddle(context, x, y, width, height) {
  this.context = context;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
};

Paddle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if(this.x < 0) { // all the way to the left
    this.x = 0;
    this.x_speed = 0;
  } else if (this.x + this.width > 400) { // all the way to the right
    this.x = 400 - this.width;
    this.x_speed = 0;
  }
};

Paddle.prototype.render = function() {
  this.context.fillStyle = "#0000FF";
  this.context.fillRect(this.x, this.y, this.width, this.height);
};

module.exports = Paddle;

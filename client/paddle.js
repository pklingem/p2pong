function Paddle(context, x, y, width, height) {
  this.context = context;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

Paddle.prototype.render = function() {
  this.context.fillStyle = "#0000FF";
  this.context.fillRect(this.x, this.y, this.width, this.height);
};

module.exports = Paddle;

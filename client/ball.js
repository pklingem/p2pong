function Ball(context, x, y) {
  this.context = context;
  this.x = x;
  this.y = y;
  this.x_speed = 0;
  this.y_speed = 3;
  this.radius = 5;
}

Ball.prototype.render = function() {
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  this.context.fillStyle = "#000000";
  this.context.fill();
};

module.exports = Ball;

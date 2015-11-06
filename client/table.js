function Table(width, height) {
  this.width = width;
  this.height = height;
  canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
}

Table.prototype.render = function() {
  this.context.fillStyle = '#FF00FF';
  this.context.fillRect(0, 0, this.width, this.height);
};

module.exports = Table;

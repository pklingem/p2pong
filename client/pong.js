var animate = require('./animate');

var canvas = document.createElement('canvas');
var width = 400;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

var step = function() {
  update();
  render();
  animate(step);
};

var update = function() {
};

var render = function() {
  context.fillStyle = '#FF00FF';
  context.fillRect(0, 0, width, height);
};

module.exports = function(opts) {
  window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
  };
};

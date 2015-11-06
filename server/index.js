var express = require('express');
var http  = require('http');
var idgen = require('idgen');
var path  = require('path');

var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

io.on('connection', connection);

app.get('/', redirect);
app.use(express.static('dist'));
app.get('/:room', renderGame);

server.listen(process.env.PORT || 3030);

function connection(socket) {
  socket.on('error', console.error);
  socket.on('peer', peer);

  var room = path.basename(socket.handshake.referer);
  socket.join(room);

  function peer(id) {
    console.log('New peer:', id);
    io.to(room).emit('peer', id);
  }
}

function redirect(req, res, next) {
  res.redirect('/' + idgen(8));
}

function renderGame(req, res, next) {
  var options = { root: path.join(__dirname, '../dist') };
  res.sendFile('index.html', options);
}

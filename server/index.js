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
app.get('/service/oembed', oembed);

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

function oembed(req, res, next) {
  res.json({
    version: "1.0",
    type: "link",
    width: 400,
    height: 600,
    title: "p2pong",
    url: req.params.url,
    author_name: ":sleepypatrick: & :pixelatedscott:",
    author_url: "http://hackathon.articulate.com",
    provider_name: "Articulate",
    provider_url: "http://hackathon.articulate.com"
  });
}

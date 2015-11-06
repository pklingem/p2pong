var express = require('express');
var http = require('http')
var p2p = require('socket.io-p2p-server')

var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

io.use(p2p.Server);

io.on('connection', function(socket){
  socket.on('error', function(err) {
    console.log(err);
  });
  console.log('connection');
});

app.use(express.static('dist'));

server.listen(process.env.PORT || 3030);

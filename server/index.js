var express = require('express');
var http = require('http')
var p2p = require('socket.io-p2p-server')

var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

io.use(p2p.Server);

io.on('connection', function(socket){
  console.log('connection');
});

app.use(express.static('dist'));

server.listen(3030);

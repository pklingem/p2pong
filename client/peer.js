var Peer = require('peerjs');

var peer   = new Peer({ key: '6vwzbeq89uo6flxr', debug: 1 });
var socket = require('socket.io-client')();

peer.on('connection', connected);
peer.on('error', console.error.bind(console));
peer.on('open', notify);

socket.on('error', console.error.bind(console));
socket.on('peer', connect);

function connect(id) {
  console.log('Opponent id:', id);
  peer.player = 'one';
  connected(peer.connect(id))
}

function emit(event) {
  peer.emit(event.type, event.data);
}

function notify(id) {
  console.log('Player id:', id);
  socket.emit('peer', id);
}

function connected(conn) {
  peer.connection = conn;
  if (!peer.player) peer.player = 'two';
  conn.on('data', emit);
  peer.emit('connected', conn);
}

module.exports = peer;

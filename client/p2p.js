var P2P = require('socket.io-p2p');
var socket = require('socket.io-client')();

var p2p = new P2P(socket);

// this event will be triggered over the socket transport
// until `usePeerConnection` is set to `true`
p2p.on('peer-msg', function(data) {
  console.log(data);
});

p2p.on('upgrade', function(data) {
  p2p.emit('peer-msg', 'hi');
  console.log('upgrade');
});

module.exports = p2p;
